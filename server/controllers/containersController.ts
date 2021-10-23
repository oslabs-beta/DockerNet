import { Request, Response, NextFunction } from 'express';

import util from 'util';

import * as child_process from 'child_process';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);
// JS module pattern:
const containersController = (() => {
  const connectContainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { networkName, containerName } = req.body;

      // connect container, only checking for error
      // because default stdout from docker is not
      // important for our purposes here
      const { stderr } = await exec(
        `docker network connect ${networkName} ${containerName}`
      );

      if (stderr) {
        return next({
          log: 'Docker CLI responsive but throwing error in connect container middleware',
          message: stderr,
        });
      }

      res.locals.networkName = networkName;

      return next();
    } catch (error) {
      return next({
        log: 'Docker CLI unresponsive: Error in connect container middleware',
        message: error,
      });
    }
  };

  const disconnectContainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { networkName, containerName } = req.body;

      // disconnect container, only checking error
      // as what's returned from docker here is not important
      const { stderr } = await exec(
        `docker network disconnect ${networkName} ${containerName}`
      );

      if (stderr) {
        return next({
          log: 'Docker CLI responsive but throwing error in disconnect container middlewar',
          message: stderr,
        });
      }

      res.locals.networkName = networkName;

      return next();
    } catch (error) {
      return next({
        log: 'Docker CLI unresponsive: error in disconnect container middlewar',
        message: error,
      });
    }
  };

  return {
    connectContainer,
    disconnectContainer,
  };
})();

export default containersController;
