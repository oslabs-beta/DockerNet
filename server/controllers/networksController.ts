import { Request, Response, NextFunction } from 'express';
import { formatDockerJSON } from '../helpers/formatDockerJSON';
import util from 'util';
import * as child_process from 'child_process';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);

// const somethingController = {}
// somethingController.doSomethong = function

// JS Module pattern:
const networksController = (() => {
  const getNetworks = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // format response from CLI to include only driver and name of network
    const { stdout, stderr } = await exec(
      `docker network ls --format '{"driver": "{{ .Driver }}", "name": "{{ .Name }}"}'`
    );

    if (stderr) {
      return next({
        log: 'Error in get networks middleware',
        message: stderr,
      });
    }
    // format the incomplete JSON returned from Docker
    res.locals.networks = formatDockerJSON(stdout);
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
    getNetworks,
    createNetwork,
    deleteNetwork,
  };
})();

export default networksController;
