import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './NavigationBar.module.css';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { Info } from '../Icons/Info';

export const NavigationBar = () => {
  const {
    dogs,
    likedDogs,
    isMosaic,
    setIsMosaic,
    isInfoModalVisible,
    setIsInfoModalVisible,
  } = useAppContext();
  const { pathname } = useRouter();
  const numberOfFetchedDogs = dogs.length;
  const numberOfLikedDogs = likedDogs.length;
  const isHomePage = pathname === '/';
  const screenWidth = useScreenWidth();
  const shouldShowMosaic = screenWidth && screenWidth < 451;

  const defaultNavigationItems = [
    {
      href: '/',
      underElement: '',
      badge: <p className={styles.counterLabel}> {numberOfFetchedDogs}</p>,
      iconClass: styles.dogIcon,
    },
    {
      href: '/liked',
      badge: <p className={styles.counterLabel}> {numberOfLikedDogs}</p>,
      iconClass: styles.heartIcon,
    },
    {
      href: '/filter',
      badge: '',
      iconClass: styles.filterIcon,
    },
  ];

  const toggleMosaic = () => {
    setIsMosaic(!isMosaic);
  };

  const handleToggleInfoModal = () => {
    setIsInfoModalVisible(!isInfoModalVisible);
  };

  if (isInfoModalVisible) {
    return (
      <div className={styles.menu}>
        <button className={styles.navButton} onClick={handleToggleInfoModal}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className={styles.menu}>
      {defaultNavigationItems.map(({ href, badge, iconClass }) => (
        <Link key={href} href={href}>
          <button
            className={clsx(styles.navButton, iconClass, {
              [styles.selected]: pathname === href,
            })}
          >
            {badge}
          </button>
        </Link>
      ))}
      {isHomePage && shouldShowMosaic && (
        <button
          onClick={toggleMosaic}
          className={clsx(styles.navButton, {
            [styles.mosaicIconON]: isMosaic,
            [styles.mosaicIconOFF]: !isMosaic,
          })}
        ></button>
      )}
      <button
        onClick={handleToggleInfoModal}
        className={clsx(styles.navButton)}
      >
        <Info />
      </button>
    </div>
  );
};
