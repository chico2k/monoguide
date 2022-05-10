import { buildSchemaSync } from 'type-graphql';
import { ApolloServer } from 'apollo-server-lambda';
import Container from 'typedi';
import type { IContext } from '@sportsguide/auth/src/types';
import { AvatarResolver } from '../../../domain/Avatar/resolver';
import { UploadResolverInput } from '../../../domain/Image/types';
import { ImageResolver } from '../../../domain/Image/resolver';
import { LocationResolver } from '../../../domain/Location/resolver';
import { TagResolver } from '../../../domain/Tag/resolver';
import { TagRefResolver } from '../../../domain/TagRef/resolver';
import { ReviewResolver } from '../../../domain/Review/resolver';
import { ReviewResponseResolver } from '../../../domain/ReviewResponse/resolver';
import { SportRefResolver } from '../../../domain/SportRef/resolver';
import { SportResolver } from '../../../domain/Sport/resolver';
import { UserResolver } from '../../../domain/User/resolver';
import { VitaResolver } from '../../../domain/Vita/resolver';
import { ContainerInjection } from '../../ContainerInjection';

export const resolver = [
  UserResolver,
  SportResolver,
  SportRefResolver,
  ReviewResponseResolver,
  ReviewResolver,
  TagRefResolver,
  TagResolver,
  VitaResolver,
  LocationResolver,
  ImageResolver,
  UploadResolverInput,
  AvatarResolver
];

class MockApolloServer {
  static getClient = (context?: IContext): ApolloServer => {
    const schema = MockApolloServer.buildSchema();

    const event = {};

    ContainerInjection.setupContainerInjection({ env: 'TESTING' });

    return new ApolloServer({
      schema,
      context: () => ({
        event,
        context: { ...context },
        container: Container
      })
    });
  };

  private static buildSchema = () => buildSchemaSync({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolvers: [resolver] as any
    });
}

export { MockApolloServer };
