import express, { Request, Response } from 'express';
import containersController from '../controllers/containersController';
const router = express.Router();

router.get(
  '/',
  containersController.getContainers,
  containersController.formatContainers,
  (req: Request, res: Response) => {
    console.log('pinged controllers router');
    res.status(200).json(res.locals.containers);
  }
);

export default router;
