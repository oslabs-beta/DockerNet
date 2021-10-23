import { Request, Response, NextFunction } from 'express';
import util from 'util';
import * as child_process from 'child_process';
import { formatNetworksAndContainers } from '../helpers/formatNetworksAndContainers';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);

// const somethingController = {}
// somethingController.doSomethong = function

// JS Module pattern:
const networksController = (() => {
  const getNetworksAndContainers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // this version of the docker API returns networks and associated containers
    // Docker's API is backwards compatible with older versions
    const { stdout, stderr } = await exec(
      'curl --unix-socket /var/run/docker.sock http://localhost/v1.18/networks'
    );

    if (!stdout) {
      return next({
        log: 'Error in get networks and containers middleware',
        message: stderr,
      });
    }

    const rawNetworksAndContainers = JSON.parse(stdout);

    const networksAndContainers = formatNetworksAndContainers(
      rawNetworksAndContainers
    );

    res.locals.networksAndContainers = networksAndContainers;

    return next();
  };

  const createNetwork = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // name of network and associated driver
    const { networkName, driver } = req.body;
    // only checking for error as we don't need
    // the id of the new network returned from docker
    const { stderr } = await exec(
      `docker network create -d ${driver} ${networkName}`
    );

    if (stderr) {
      return next({
        log: 'Error in create network middleware',
        message: stderr,
      });
    }

    return next();
  };

  const deleteNetwork = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // name of network
    const { networkName } = req.query;

    // make sure that the network to remove
    // is not one of the default networks
    if (
      networkName === 'bridge' ||
      networkName === 'host' ||
      networkName === 'none'
    ) {
      return next({
        log: 'Attempt to delete default docker network',
      });
    }

    // only concerned with the error as the default
    // return from docker CLI here is not needed
    const { stderr } = await exec(`docker network rm ${networkName}`);

    if (stderr) {
      return next({
        log: 'Error in delete network middleware',
        message: stderr,
      });
    }

    return next();
  };

  return {
    getNetworksAndContainers,
    createNetwork,
    deleteNetwork,
  };
})();

export default networksController;
