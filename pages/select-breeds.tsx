import Head from "next/head";
import React from "react";
import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🐕 Select Breeds</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <h4 className={styles.title}>Select 🐕Breeds</h4>
      <div className={styles.aboutContainer}>
        <a
          href='https://github.com/zdzislawbela/dogs-app'
          target='_blank'
          rel='noreferrer'
        ></a>
      </div>
    </div>
  );
}
