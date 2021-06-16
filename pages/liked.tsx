import Head from "next/head";
import React from "react";
import { LikedDogs } from "../components/LikedDogs";
import styles from "../styles/Home.module.css";

export default function Liked() {
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
      <LikedDogs />
    </div>
  );
}
