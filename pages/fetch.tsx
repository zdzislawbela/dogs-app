import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { FetchedDogs } from '../components/FetchedDogs/FetchedDogs';
import { useAppContext } from '../context';

import style from '../styles/Page.module.css';

export default function Fetch() {
  const { dogs, loading } = useAppContext();
  const [pageTitle, setPageTitle] = useState('🐕 Loading ...');

  useEffect(() => {
    if (loading) {
      return setPageTitle('🐕 Loading ...');
    }

    setPageTitle(`🐕 You fetched ${dogs.length} dogs!`);
  }, [dogs.length, loading]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className={style.main}>
        <FetchedDogs />
      </div>
    </>
  );
}
