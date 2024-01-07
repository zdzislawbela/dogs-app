import Head from 'next/head';
import { useSwipeable } from 'react-swipeable';

import router from 'next/router';
import React, { useEffect, useState } from 'react';

import { FetchedDogs } from '../components/FetchedDogs/FetchedDogs';
import { useAppContext } from '../context/AppContext';

import style from '../styles/Page.module.css';

export default function Home() {
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
  const { dogs, loading } = useAppContext();
  const [pageTitle, setPageTitle] = useState('🐕 Loading ...');

  useEffect(() => {
    if (loading) {
      return setPageTitle('🐕 Loading ...');
    }

    setPageTitle(`🐕 You fetched ${dogs.length} dogs!`);
  }, [dogs.length, loading]);

  if (dogs.length === 0) {
    return null;
  }

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
