import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import router from 'next/router';

import { FetchedDogs } from '../components/FetchedDogs/FetchedDogs';
import { useAppContext } from '../context';

import style from '../styles/Page.module.css';

export default function Fetch() {
  const { dogs, loading } = useAppContext();
  const [pageTitle, setPageTitle] = useState('🐕 Loading ...');

  const handleSwipeLeft = () => {
    router.push('/liked');
  };

  const handleSwipeRight = () => {
    router.push('/filter');
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

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

      <div {...handlers} className={style.main}>
        <FetchedDogs />
      </div>
    </>
  );
}
