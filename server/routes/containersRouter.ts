import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
const router = express.Router();
// return array of containers associated with
// network name provided in query parameter

router.get(
  '/',
  containersController.getRunningContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

router.get(
  '/by-network',
  containersController.getContainersByNetwork,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

router.delete(
  '/',
  containersController.disconnectContainer,
  containersController.getContainersByNetwork,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    console.log('hello from delete to continaers');
    res.status(200).json(res.locals.containers);
  }
);

router.put(
  '/',
  containersController.connectContainer,
  containersController.getContainersByNetwork,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    console.log('hello from put to containers');
    res.status(200).json(res.locals.containers);
  }
);

export default router;
