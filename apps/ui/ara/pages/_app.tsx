import { useEffect } from 'react';
import Head from 'next/head';

import AppConfig from '../components/appConfig';
import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
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
      <AppConfig>
        <Component {...pageProps} />
      </AppConfig>
    </>
  );
}

export default CustomApp;
