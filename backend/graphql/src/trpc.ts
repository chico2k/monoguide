import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { ContainerInjection } from './lib/ContainerInjection';
import { main } from './lib/trpc/';

ContainerInjection.setupContainerInjection({ env: 'PRISMA' });


main()