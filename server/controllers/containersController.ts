import { Request, Response, NextFunction } from 'express';

import util from 'util';

import * as child_process from 'child_process';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);

const containersController = (() => {
  // function for retrieving containers connected to a particular network
  const getContainersByNetwork = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // network name sent from frontend as query parameter
    const { networkName } = req.query;
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

    const rawContainers = res.locals.rawContainers;

    const containers = Object.keys(rawContainers).map((containerId) => {
      return {
        id: containerId,
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
    getContainersByNetwork,
    formatContainers,
  };
})();

export default containersController;
