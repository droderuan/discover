import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { AndromedaContextProvider, CoreLayout } from '@discover/ui/andromeda';
import { DefaultAppConfig, useDeviceStatus } from '@discover/ui/next';
import { AuthProvider } from '@discover/ui/next/auth';

import AuthLayout from '../components/layouts/AuthLayout';
import HookProvider from '../hooks';
import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { isMobile } = useDeviceStatus();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    jssStyles?.parentElement.removeChild(jssStyles);
  }, []);

  if (isMobile === null) return null;

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
                <CoreLayout
                  menuRoutes={[
                    {
                      icon: HomeIcon,
                      label: 'home',
                      path: '/',
                      focused: true,
                    },
                    {
                      icon: AddToQueueIcon,
                      label: 'meet',
                      path: '/',
                    },
                    {
                      icon: AddToQueueIcon,
                      label: 'new meet',
                      path: '/',
                    },
                  ]}
                >
                  <Component {...pageProps} />
                </CoreLayout>
              )}
            </HookProvider>
          </AndromedaContextProvider>
        </AuthProvider>
      </DefaultAppConfig>
    </>
  );
}

export default CustomApp;
