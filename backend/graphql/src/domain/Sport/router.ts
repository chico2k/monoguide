import { z } from 'zod';
import { SportController } from './controller';
import { Container, Service } from 'typedi';
import { Trpc } from '../../lib/trpc/router';


@Service()
export class SportRouter {

    tRPC = Container.get(Trpc)
    getRouter = () => {
        return this.tRPC.createRouter({ protectedRouter: false })
            .merge(this.createSport)
            .merge(this.getSport)

    }


    createSport = this.tRPC.createRouter({ protectedRouter: true })
        .mutation('createSport', {
            input: z.object({
                level: z.number(),
                sportRefId: z.number(),

            }),

            async resolve({ input, ctx }) {

                const controller = Container.get(SportController);


                return controller.createSportController(input, ctx);


            },
        })

    getSport = this.tRPC.createRouter({ protectedRouter: true })
        .mutation('getSport', {
            input: z.object({
                level: z.number(),
                sportRefId: z.number(),

            }),

            async resolve({ input, ctx }) {

                const controller = Container.get(SportController);


                return controller.createSportController(input, ctx);


            },
        })

}
