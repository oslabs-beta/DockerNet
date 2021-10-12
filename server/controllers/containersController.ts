import { Request, Response, NextFunction } from 'express';

import util from 'util';

import * as child_process from 'child_process';
import { formatDockerJSON } from '../helpers/formatDockerJSON';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);
// JS module pattern:
const containersController = (() => {
  const getRunningContainers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // get all running containers and return the info as a list
    // of objects with ports, name, and id of the container
    const { stdout, stderr } = await exec(
      `docker ps --format '{"ports": "{{ .Ports}}", "name": "{{ .Names }}", "id": "{{ .ID }}"}'`
    );

    if (stderr) {
      return next({
        log: 'Error in get running containers middleware',
        message: stderr,
      });
    }

    res.locals.containers = formatDockerJSON(stdout);
    return next();
  };

  // function for retrieving containers connected to a particular network
  const getContainersByNetwork = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check if network name is coming from res.locals or from a request from frontend
    const { networkName } = res.locals.networkName ? res.locals : req.query;
    const { stdout, stderr } = await exec(
      `docker network inspect ${networkName}`
    );

    if (stderr) {
      return next({
        log: 'Error in get containers middleware',
        message: stderr,
      });
    }

    // stdout is an array with the one element being the network
    const dockerResponse = JSON.parse(stdout);

    // access the network's object of containers
    const rawContainers = dockerResponse[0].Containers;

    // store in res.locals for reformatting
    res.locals.rawContainers = rawContainers;

    return next();
  };

  const connectContainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { networkName, containerName } = req.body;

    // connect container, only checking for error
    // because default stdout from docker is not
    // important for our purposes here
    const { stderr } = await exec(
      `docker network connect ${networkName} ${containerName}`
    );

    if (stderr) {
      return next({
        log: 'Error in connect container middleware',
        message: stderr,
      });
    }

    res.locals.networkName = networkName;

    return next();
  };

  const disconnectContainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { networkName, containerName } = req.body;

    // disconnect container, only checking error
    // as what's returned from docker here is not important
    const { stderr } = await exec(
      `docker network disconnect ${networkName} ${containerName}`
    );

    if (stderr) {
      return next({
        log: 'Error in disconnect container middlewar',
        message: stderr,
      });
    }

    res.locals.networkName = networkName;

    return next();
  };

  const formatContainers = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!res.locals.rawContainers)
      return next({
        log: 'Error in format containers middleware',
        message: 'No raw containers on res.locals.rawContainers',
      });

    // raw containers is an object
    // keys represent container ids
    // values are objects with container info
    const rawContainers = res.locals.rawContainers;

    // map over the ids to create an array of container objects
    // container objects have properties id, name, ipAddress
    const containers = Object.keys(rawContainers).map((containerId) => {
      return {
        id: containerId.slice(0, 14),
        name: rawContainers[containerId].Name,
        ipAddress: rawContainers[containerId].IPv6Address
          ? rawContainers[containerId].IPv6Address
          : rawContainers[containerId].IPv4Address,
      };
    });

    res.locals.containers = containers;

    return next();
  };

  return {
    getRunningContainers,
    getContainersByNetwork,
    connectContainer,
    disconnectContainer,
    formatContainers,
  };
})();

export default containersController;
