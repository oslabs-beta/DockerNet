import express, {
  Application,
  Request,
  Response,
  ErrorRequestHandler,
} from 'express';
import networksRouter from './routes/networksRouter';
import containersRouter from './routes/containersRouter';
import path from 'path';

const app: Application = express();

const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  console.log('pinged server');
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// all traffic to /api/networks
app.use('/api/networks', networksRouter);

// all traffic to /api/containers
app.use('/api/containers', containersRouter);

app.get('*', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

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
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
