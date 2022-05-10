import 'cross-fetch/polyfill';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../src/lib/Apollo/apolloClient';
import Navbar from '../src/Container/Navigation';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/Components/Theme';
import Router, { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import reducer, { initialState } from '../src/lib/Store/reducer';
import { CustomModal } from '../src/Container/Modal';
import '../styles/globals.css';
import 'react-multi-carousel/lib/styles.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { setLoading } from '../src/lib/Store/actions';
import { ClerkProvider } from '@clerk/nextjs';
import { Context } from '../src/lib/Store/AppContext';

export default function App({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const client = useApollo(pageProps);

  const {
    loadingState: { isLoading }
  } = state;

  const value = { state, dispatch };

  const professionalThemeOptions = {
    general: {
      color: '#fb8122',
      backgroundColor: '#e1e2e4',
      fontColor: '#1d2228',
      labelFontWeight: '300',
      borderRadius: '0px'
    },
    buttons: {
      fontColor: '#fff'
    }
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      if (isLoading) return;
      return dispatch(setLoading(true));
    });
    Router.events.on('routeChangeComplete', () => dispatch(setLoading(false)));
    Router.events.on('routeChangeError', () => {
      return dispatch(setLoading(false));
    });
  }, []);

  const { pathname } = useRouter();

  const publicPages = ['/'];

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <>
          <ClerkProvider {...pageProps} theme={professionalThemeOptions}>
            <Context.Provider value={value}>
              <Navbar />
              <CustomModal />
              <Component {...pageProps} />
            </Context.Provider>
          </ClerkProvider>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}
