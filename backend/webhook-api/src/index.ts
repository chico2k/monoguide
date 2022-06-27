import 'reflect-metadata';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import express, { Request, Response } from 'express';
import { OriginController } from './controller';

export const pathToEnv = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'packages',
  'env',
  '.dev'
);

dotenv.config({ path: pathToEnv });


const app = express();

const PORT = 4001;


app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (request: Request, response: Response) =>
    OriginController.execute(request, response)
);



app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Elastic Sync Api is running at https://localhost:${PORT}`);
});
