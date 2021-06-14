import type { AppProps } from "next/app";
import React from "react";

import { AppWrapper } from "../context";

import { Layout } from "../components/Layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
}
export default MyApp;
