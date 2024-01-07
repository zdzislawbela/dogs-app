import React, { FC } from 'react';
import Head from 'next/head';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import style from './Layout.module.css';
import { InfoModal } from '../InfoModal/InfoModal';
import { useAppContext } from '../../context';

type Props = {
  children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
  const { isInfoModalVisible } = useAppContext();
  isInfoModalVisible;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <div className={style.header}>
        <NavigationBar />
      </div>
      {isInfoModalVisible && <InfoModal />}

      {children}
    </>
  );
};
