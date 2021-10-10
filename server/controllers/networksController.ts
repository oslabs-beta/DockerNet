import { Request, Response, NextFunction } from 'express';
import { formatDockerJSON } from '../helpers/formatDockerJSON';
import util from 'util';
import * as child_process from 'child_process';

// make the terminal commands return normal thenable promises
const exec = util.promisify(child_process.exec);

// controller basically identical to normal controller = {} setup with controller.thing = function
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

  return {
    getNetworks,
  };
})();

export default networksController;
