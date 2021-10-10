import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
const router = express.Router();
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

export default router;
