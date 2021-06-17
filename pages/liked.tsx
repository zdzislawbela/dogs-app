import Head from "next/head";
import React from "react";
import { LikedDogs } from "../components/LikedDogs/LikedDogs";
import { useAppContext } from "../context";

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
      <div>{likedDogs.length !== 0 && <LikedDogs />}</div>
    </div>
  );
}
