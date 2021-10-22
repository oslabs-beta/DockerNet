import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
import networksController from '../controllers/networksController';
const router = express.Router();

// get all running containers
// return array of container objects
router.get(
  '/',
  containersController.getRunningContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

// return array of containers associated with
// network name provided in query parameter
router.get(
  '/by-network',
  containersController.getContainersByNetwork,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

// disconnect container from network
// return new array of containers connected
// to that particular network
router.delete(
  '/',
  containersController.disconnectContainer,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    console.log('hello from delete to continaers');
    res.status(200).json(res.locals.networksAndContainers);
  }
);

// connect container to network
// return fresh array of containers
// connected to that network
router.put(
  '/',
  containersController.connectContainer,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

export default router;
