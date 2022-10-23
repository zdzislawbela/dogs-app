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
    { href: '/', label: 'Home', underElement: '', iconClass: styles.houseIcon },
    {
      href: '/filter',
      label: 'Filter',
      badge: '',
      iconClass: styles.filterIcon,
    },
    {
      href: '/fetch',
      label: 'Fetch',
      badge: (
        <p className={styles.fetchedCounterLabel}> {numberOfFetchedDogs}</p>
      ),
      iconClass: styles.dogIcon,
    },
    {
      href: '/liked',
      label: 'Liked',
      badge: <p className={styles.likedCounterLabel}> {numberOfLikedDogs}</p>,
      iconClass: styles.heartIcon,
    },
  ];

  return (
    <div className={styles.menu}>
      {navButtons.map(({ href, label, badge, iconClass }) => (
        <Link key={href} href={href}>
          <button
            className={clsx(styles.navButton, iconClass, {
              [styles.selected]: pathname === href,
            })}
          >
            <a className={styles.label}>{label}</a>
            {badge}
          </button>
        </Link>
      ))}

      <KebabMenu />
    </div>
  );
};
