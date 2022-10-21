import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import SessionModals from '../components/SessionModals';
import { ModalsContextProvider } from '../context/modalsContext';
import '../styles/globals.css';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>mxgp-picks.com</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ModalsContextProvider>
          <SessionModals />
          <Component {...pageProps} />
        </ModalsContextProvider>
      </SessionProvider>
    </>
  );
}
