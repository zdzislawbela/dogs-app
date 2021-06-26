import React, { FC } from "react";
import Head from "next/head";
import { Header } from "../Header/Header";
import style from "./Layout.module.css";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      <div className={style.header}>
        <Header />
      </div>
      {children}
    </>
  );
};
