import 'reflect-metadata';
import type { ApolloServer } from 'apollo-server-lambda';
import * as graphql from "./graphql";
import { MockApolloServer } from '../../../lib/apolloServer/__mook__';

describe('Graph Sport Test - Authenticated', () => {
  let apolloServer: ApolloServer;

  beforeAll(() => {
    apolloServer = MockApolloServer.getClient();
  });

  it('should create a sport', async () => {
    const input = {
      sportRef_id: 1,
      level: 2
    };

    const response = await apolloServer.executeOperation({
      query: graphql.createSport,
      variables: input
    });

    if (!response.data) throw new Error(JSON.stringify(response));

    const {
      data: { createSport }
    } = response;

    expect(createSport).toEqual(
      expect.objectContaining({
        level: input.level,
        sportRef: expect.objectContaining({
          id: input.sportRef_id
        })
      })
    );
  });
});

describe('Graph Sport Test - Unauthenticated', () => {
  let apolloServer: ApolloServer;

  beforeAll(() => {
    apolloServer = MockApolloServer.getClient();
  });

  it('should not create a new sport', async () => {
    const input = {
      sportRef_id: 1,
      level: 2
    };
    const response = await apolloServer.executeOperation({
      query: graphql.createSport,
      variables: input
    });

    expect(response.data).toBe(null);
    expect(response.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'SPORT_SERVICE_UNAUTHENTICATED' })
      ])
    );
  });
});
