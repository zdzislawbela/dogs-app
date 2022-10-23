import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';

import { AppWrapper } from '../context';

import { Layout } from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#bdeeff" />
        <meta name="apple-mobile-web-app-status-bar" content="#bdeeff" />
        <meta
          name="description"
          content="Collecting open source dog pictures from dog.ceo"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}
export default MyApp;
