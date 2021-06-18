import Head from "next/head";
import React from "react";
import { LikedDogs } from "../components/LikedDogs/LikedDogs";
import Image from "next/image";
import { useAppContext } from "../context";

import styles from "../styles/Page.module.css";

export default function Liked() {
  const { likedDogs } = useAppContext();

  return (
    <div>
      <Head>
        <title>🐕 Liked!</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      {likedDogs.length !== 0 ? (
        <LikedDogs />
      ) : (
        <div className={styles.container}>
          Go to Fetch Tab and click:
          <Image
            src='/heart.png'
            alt='Picture of heart'
            width={24}
            height={24}
          />
        </div>
      )}
    </div>
  );
}
