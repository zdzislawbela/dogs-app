import Head from "next/head";
import React from "react";
import { FetchedDogs } from "../components/FetchedDogs/FetchedDogs";
import { DogsCounterBar } from "../components/DogsCounterBar/DogsCounterBar";
import { useAppContext } from "../context";
import style from "../styles/Page.module.css";

export default function Fetch() {
  const { fetchedDogs } = useAppContext();
  const numberOfDogs = fetchedDogs.length;
  let titleOfPage = `🐕 You fetched ${numberOfDogs} dogs!`;

  if (fetchedDogs.length === 0) {
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
      <div className={style.main}>
        <FetchedDogs />
        <DogsCounterBar />
      </div>
    </div>
  );
}
