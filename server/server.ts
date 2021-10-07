import express, { Application, Request, Response } from 'express';
import path from 'path';
import testController from './controllers/testController';

const app: Application = express();

const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req: Request, res: Response) => {
  console.log('pinged server');
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// testing the docker command
app.get(
  '/api',
  testController.showContainers,
  (req: Request, res: Response) => {
    res.status(200).json('hello world 2');
  }
);

app.get('*', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
