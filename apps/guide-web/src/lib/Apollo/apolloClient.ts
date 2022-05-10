import { produce } from 'immer';
import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  concat
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

// Get Apollo Backend
const apolloBackend = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const authMiddleware = new ApolloLink((operation, forward) => {
  console.log('here?');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: 'null'
    }
  }));

  return forward(operation);
});

const getAuthLink = (context?) => {
  return setContext(async () => {
    return {
      headers: {
        authorization: context?.req?.cookies?.__session,
        cookie: context?.req?.cookies
      }
    };
  });
};

function createApolloClient(context?) {
  const authLink = getAuthLink(context);
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
    link: ApolloLink.from([authLink, apolloBackend]),
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            sport: {
              merge(_existing, incoming) {
                if (incoming === null) return [];
                return [...incoming];
              }
            }
          }
        },
        Query: {
          fields: {
            getSportTypeList: {
              merge(_existing, incoming) {
                return incoming;
              }
            },

            getUploadImageList: {
              merge(existing, incoming) {
                const images = existing ? [...existing.hits.hits] : [];

                incoming.hits.hits.forEach((item) => {
                  images.push(item);
                });

                return produce(incoming, (draft) => {
                  draft.hits.hits = images;
                });
              }
            }
          }
        }
      }
    })
  });
}

export function initializeApollo(initialState = null, context?) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
