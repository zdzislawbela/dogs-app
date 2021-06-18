import Head from "next/head";
import React from "react";
import FormLabel from "@material-ui/core/FormLabel";

import { useAppContext } from "../context";
import { dogBreeds } from "../data/dogbreeds";
import { BreedCheckbox } from "../BreedCheckbox/BreedCheckbox";
import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const {
    loading,
    setLoading,
    dogs,
    setDogs,
    breed,
    setBreed,
    error,
    setError,
    setApiCallCounter,
    dogsAPI,
  } = useAppContext();

  return (
    <div className={styles.main}>
      <Head>
        <title>🐕 Select Breeds</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={styles.breeds}>
        <FormLabel component='legend'>
          Select breeds you'd like to fetch
        </FormLabel>
        <div className={styles.breed}>
          <BreedCheckbox breed='Select All' />
        </div>

        {dogBreeds.map((breed) => {
          return (
            <div key={breed} className={styles.breed}>
              <BreedCheckbox breed={breed} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
