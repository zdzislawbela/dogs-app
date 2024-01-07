import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { KebabMenu } from '../KebabMenu/KebabMenu';

import styles from './Menu.module.css';
import { useAppContext } from '../../context';
import { useRouter } from 'next/router';

export const Menu = () => {
  const { dogs, likedDogs } = useAppContext();
  const { pathname } = useRouter();
  const numberOfFetchedDogs = dogs.length;
  const numberOfLikedDogs = likedDogs.length;

  const navButtons = [
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

  return (
    <div className={styles.menu}>
      {navButtons.map(({ href, badge, iconClass }) => (
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

      <KebabMenu />
    </div>
  );
};
