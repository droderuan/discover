import { DefaultAppConfig } from '@discover/ui-react-config';
import { AppProps } from 'next/app';
import Head from 'next/head';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to ui/ara!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultAppConfig>
        <main>
          <Component {...pageProps} />
        </main>
      </DefaultAppConfig>
    </>
  );
}

export default CustomApp;
