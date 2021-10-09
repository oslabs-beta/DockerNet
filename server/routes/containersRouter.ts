import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
const router = express.Router();

router.get(
  '/by-network',
  containersController.getContainersByNetwork,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.containers);
  }
);

export default router;
