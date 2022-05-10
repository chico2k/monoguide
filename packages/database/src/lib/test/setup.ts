import path from 'path';
import dotenv from 'dotenv';

export const pathToEnv = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  'env',
  'testing'
);

dotenv.config({ path: pathToEnv });
