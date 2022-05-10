/* eslint-disable no-console */
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import { Apollo } from './lib/apolloServer';
import { ContainerInjection } from './lib/ContainerInjection';

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
console.log('pathToEnv', pathToEnv);

ContainerInjection.setupContainerInjection({ env: 'PRISMA' });
const apolloServer = Apollo.setupApolloServer();

apolloServer
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.error(err));
