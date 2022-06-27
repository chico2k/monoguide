import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
export { AuthTestFactory } from './AuthTestFactory';
export { AuthProvider } from './AuthProvider';
export { AuthHelper } from './AuthHelper';
export type {
  IUserAuth,
  IVerfiySessionFail,
  IVerfiySessionSuccess,
  IContextHelper
} from './types';

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
