import React, { FC } from "react";
import { Header } from "../Header/Header";

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
