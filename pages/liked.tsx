import Head from "next/head";
import React from "react";

import { LikedDogs } from "../components/LikedDogs/LikedDogs";
import { ParticleBackground } from "../components/ParticleBackground/ParticleBackground";

import { useAppContext } from "../context";

import styles from "../styles/Page.module.css";

export default function Liked() {
  const { likedDogs } = useAppContext();

  return (
    <>
      <Head>
        <title>🐕 Liked!</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <ParticleBackground />{" "}
      <div className={styles.likedDogsContainer}>
        {likedDogs.length !== 0 ? (
          <LikedDogs />
        ) : (
          <div className={styles.likedNoDogs}>
            Go to Fetch Tab and click:
            <img
              src='/heart.png'
              alt='Picture of heart'
              width={24}
              height={24}
            />
          </div>
        )}
      </div>
    </>
  );
}
