import Container, { Service } from "typedi";
import type * as trpcExpress from '@trpc/server/adapters/express';
import { AuthProvider } from "@sportsguide/auth";
import type { IVerfiySessionOuput } from "@sportsguide/auth/src/types";
import * as trpc from '@trpc/server';
import { SportRouter } from "../../domain/Sport/router";

export class Trpc {
    getAppRouter = trpc.router<trpc.inferAsyncReturnType<typeof this.createContext>>().merge(
        'sport.', Container.get(SportRouter).getRouter()
    )

    createContext = async ({
        req,
        res,
    }: trpcExpress.CreateExpressContextOptions): Promise<{ auth: IVerfiySessionOuput }> => {

        const auth = Container.get(AuthProvider);
        return {
            auth: { ...await auth.verifySession(req, res) }
        };
    };


    createRouter({ protectedRouter }: { protectedRouter: boolean }) {
        if (!protectedRouter) return this.createUnprotecetedRouter()
        return this.createProtectedRouter()

    }

    createUnprotecetedRouter() {
        return trpc.router<trpc.inferAsyncReturnType<typeof this.createContext>>()
    }

    createProtectedRouter() {
        return trpc
            .router<trpc.inferAsyncReturnType<typeof this.createContext>>().middleware(({ ctx, next }) => {
                if (!ctx.auth.authenticated || !ctx.auth.payload) {
                    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
                }

                return next({
                    ctx: {
                        auth: ctx.auth
                    }
                })
            });
    }


}





