import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
import networksController from '../controllers/networksController';
const router = express.Router();

router.get(
  '/',
  containersController.getRunningContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

// disconnect container from network
// return new array of fresh networks/containers
router.delete(
  '/',
  containersController.disconnectContainer,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

// connect container to network
// return fresh array of networks/containers
router.put(
  '/',
  containersController.connectContainer,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

export default router;
