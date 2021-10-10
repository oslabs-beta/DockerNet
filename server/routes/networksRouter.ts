import express, { Request, Response } from 'express';
import networksController from '../controllers/networksController';
const router = express.Router();
// return array of network objects
router.get(
  '/',
  networksController.getNetworks,
  (req: Request, res: Response) => {
    console.log('pinged networks router');
    res.status(200).json(res.locals.networks);
  }
);

export default router;
