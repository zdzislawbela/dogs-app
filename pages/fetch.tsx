import Head from "next/head";
import React from "react";
import { FetchedDogs } from "../components/FetchedDogs/FetchedDogs";
import { useAppContext } from "../context";

export default function Fetch() {
  const { dogs } = useAppContext();
  const numberOfDogs = dogs.length;
  let titleOfPage = `🐕 You fetched ${numberOfDogs} dogs!`;

  if (dogs.length === 0) {
    titleOfPage = "🐕 Loading ...";
  }

  return (
    <div>
      <Head>
        <title>{titleOfPage}</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <FetchedDogs />
    </div>
  );
}
