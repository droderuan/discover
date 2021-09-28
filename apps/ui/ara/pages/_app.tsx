import {
  AndromedaContextProvider,
  CoreTemplate,
  LoginTemplate,
} from '@discover/ui-andromeda';
import { DefaultAppConfig } from '@discover/ui-next-config';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect } from 'react';
import HookProvider from '../hooks';

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
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
        <AndromedaContextProvider>
          <HookProvider>
            {pathname.startsWith('/account') ? (
              <LoginTemplate
                rightText={
                  <Typography variant="h1">
                    Join <br />
                    the best <br />
                    community
                  </Typography>
                }
              >
                <Component {...pageProps} />
              </LoginTemplate>
            ) : (
              <CoreTemplate>
                <Component {...pageProps} />
              </CoreTemplate>
            )}
          </HookProvider>
        </AndromedaContextProvider>
      </DefaultAppConfig>
    </>
  );
}

export default CustomApp;
