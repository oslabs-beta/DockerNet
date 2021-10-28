import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import networksRouter from './routes/networksRouter';
import containersRouter from './routes/containersRouter';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// all traffic to /api/networks
app.use('/api/networks', networksRouter);

// all traffic to /api/containers
app.use('/api/containers', containersRouter);

// wildcard route always returns html
// so that client side react routes don't 404
app.get('*', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const defaultErr = {
    log: 'unknown middleware error',
    status: 400,
    message: { err: 'error occurred' },
  };
  const errorObj = {
    ...defaultErr,
    log: err.log,
    message: { err: err.message },
  };
  return res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
