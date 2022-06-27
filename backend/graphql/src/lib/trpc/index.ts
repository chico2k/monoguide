import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import Container from 'typedi';
import { ContainerInjection } from '../ContainerInjection';
import { Trpc } from './router';


ContainerInjection.setupContainerInjection({ env: 'PRISMA' });

export class ExpressApp {
    tRPC = Container.get(Trpc)

    main = async () => {
        const app = express();

        // app.use((req, _res, next) => {
        //     console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

        //     next();
        // });

        app.use(
            '/trpc',
            trpcExpress.createExpressMiddleware({
                router: this.tRPC.getAppRouter,
                createContext: this.tRPC.createContext,
            }),
        );
        app.listen(2021, () => {
            console.log('listening on port 2021');
        });
    }

}
