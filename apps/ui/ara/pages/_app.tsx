import { AndromedaContextProvider } from '@discover/ui/andromeda';
import CoreTemplate from '../components/layouts/Core';
import AuthLayout from '../components/layouts/AuthLayout';
import { DefaultAppConfig } from '@discover/ui/next';
import { AuthProvider } from '@discover/ui/next/auth';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect } from 'react';
import HookProvider from '../hooks';

function CustomApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>Discover</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultAppConfig>
        <AuthProvider signInUrl="/account/login">
          <AndromedaContextProvider>
            <HookProvider>
              {pathname.startsWith('/account') ? (
                <AuthLayout
                  rightText={
                    <Typography variant="h1">
                      Join <br />
                      the best <br />
                      community
                    </Typography>
                  }
                >
                  <Component {...pageProps} />
                </AuthLayout>
              ) : (
                <CoreTemplate>
                  <Component {...pageProps} />
                </CoreTemplate>
              )}
            </HookProvider>
          </AndromedaContextProvider>
        </AuthProvider>
      </DefaultAppConfig>
    </>
  );
}

export default CustomApp;
