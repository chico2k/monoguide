import { ApolloServer } from 'apollo-server';
import { buildSchemaSync } from 'type-graphql';
import { AuthProvider, AuthHelper } from '@sportsguide/auth';
import Container from 'typedi';
import { resolver } from './resolver/index';

export class Apollo {
  private constructor() {}

  private static instance: Apollo;

  apolloServer: ApolloServer | undefined = undefined;

  public static getInstance = (): Apollo => {
    if (!Apollo.instance) {
      Apollo.instance = new Apollo();
    }
    return Apollo.instance;
  };

  static setupApolloServer = (): ApolloServer => {
    const instance = Apollo.getInstance();

    if (instance.apolloServer) return instance.apolloServer;

    const schema = buildSchemaSync({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolvers: resolver as any
    });

    const apolloServer = new ApolloServer({
      cors: {
        origin: ['http://localhost:3002'],
        credentials: true
      },
      schema,
      context: async ({ req, res }) => {

        console.log("req", req)
        console.log("req", req)
        console.log("req", req)
        const auth = Container.get(AuthProvider);
        const verified = await auth.verifySession(req, res);

        const context = {
          ...verified,
          ...AuthHelper.contextHelper
        };

        return { auth: context };
      }
    });
    instance.apolloServer = apolloServer;
    return apolloServer;
  };
}
