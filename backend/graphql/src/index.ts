/* eslint-disable no-console */
import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import { Apollo } from './lib/apolloServer';
import { ContainerInjection } from './lib/ContainerInjection';
import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import express from 'express'
import { z } from 'zod';



export const pathToEnv = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'packages',
  'env',
  '.dev'
);

const app = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context

type Context = trpc.inferAsyncReturnType<typeof createContext>;


export const appRouter = trpc
  .router()
  .query('getUser', {
    input: z.string(),
    async resolve(req) {
      req.input; // string
      return { id: req.input, name: 'Bilbo' };
    },
  })

// export type definition of API
export type AppRouter = typeof appRouter;

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)




app.listen(4003, () => console.log(`🚀  Trpc Server ready at 4003 `))




dotenv.config({ path: pathToEnv });
console.log('pathToEnv', pathToEnv);

ContainerInjection.setupContainerInjection({ env: 'PRISMA' });
const apolloServer = Apollo.setupApolloServer();

// apolloServer
//   .listen()
//   .then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   })
//   .catch((err) => console.error(err));
