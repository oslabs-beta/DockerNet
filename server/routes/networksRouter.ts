import express, { Request, Response } from 'express';
import networksController from '../controllers/networksController';
const router = express.Router();
// return array of network objects
router.get(
  '/',
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

// create new network and return fresh array of network objects
router.post(
  '/',
  networksController.createNetwork,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

// remove network and return fresh array of network objects
router.delete(
  '/',
  networksController.deleteNetwork,
  networksController.getNetworksAndContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.networksAndContainers);
  }
);

export default router;
