import Head from "next/head";
import React from "react";
import { FetchedDogsContainer } from "../components/FetchedDogsContainer";
import { LikedDogs } from "../components/LikedDogs";
import { PageNavArrows } from "../components/PageNavArrows";
import { useAppContext } from "../context";

export default function Fetch() {
  const { isModalOpen } = useAppContext();

  return (
    <div>
      <Head>
        <title>🐕 Happy fetching!</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      {isModalOpen && <LikedDogs />}
      <PageNavArrows />
      <FetchedDogsContainer />
    </div>
  );
}
