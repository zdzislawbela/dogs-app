import React, { FC } from "react";
import { Header } from "../Header/Header";
import style from "./Layout.module.css";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={style.header}>
        <Header />
      </div>
      {children}
    </>
  );
};
