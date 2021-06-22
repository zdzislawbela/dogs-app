import Head from "next/head";
import React from "react";
import { breedsData } from "../data/breedsData";
import { useAppContext } from "../context";

import { BreedCheckbox } from "../components/BreedCheckbox/BreedCheckbox";
import { SearchBreedInput } from "../components/SearchBreedInput/SearchBreedInput";
import { useLocalStorage } from "../hooks/useLocalStorage";

import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const { setFetchedDogs, isSelectAll, setIsSelectAll } = useAppContext();

  const [storagedBreeds, setStoragedBreeds] = useLocalStorage(
    "selectedBreeds",
    ""
  );

  const handleSelectAll = () => {
    setFetchedDogs([]);

    setIsSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setStoragedBreeds(breedsData);
    }
    if (isSelectAll) {
      setStoragedBreeds([]);
    }
  };

  const handleBreedCheckbox = (option: string) => {
    setFetchedDogs([]);

    const excludeFromStorage = (option: string) => {
      const select = (breed: string) => breed !== option;
      const filteredBreeds = storagedBreeds.filter(select);
      setStoragedBreeds(filteredBreeds);
    };

    const includeToStorage = (option: string) => {
      storagedBreeds.push(option);
      storagedBreeds.sort();
      setStoragedBreeds(storagedBreeds);
    };

    const isBreedSelected = storagedBreeds.includes(option);

    if (isBreedSelected) {
      excludeFromStorage(option);
    }
    if (!isBreedSelected) {
      includeToStorage(option);
    }
  };

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
        <SearchBreedInput />
        <p>Select breeds you'd like to fetch </p>
        <div className={styles.breed}>
          <BreedCheckbox
            handleCheckbox={handleSelectAll}
            breed='Select All'
            isChecked={isSelectAll}
          />
        </div>
        {breedsData.map((breed) => {
          const isBreedSelected = storagedBreeds.includes(breed);

          return (
            <div key={breed} className={styles.breed}>
              <BreedCheckbox
                handleCheckbox={handleBreedCheckbox}
                breed={breed}
                isChecked={isBreedSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}