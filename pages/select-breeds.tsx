import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";

import { BreedCheckbox } from "../components/BreedCheckbox/BreedCheckbox";
import { SearchBreedInput } from "../components/SearchBreedInput/SearchBreedInput";

import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const {
    setEmpty,
    isSelectAll,
    setIsSelectAll,
    storagedBreeds,
    setStoragedBreeds,
    breeds,
    loadBreeds,
  } = useAppContext();
  const [keyword, setKeyword] = useState("");

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setStoragedBreeds(breeds);
    }
    if (isSelectAll) {
      setStoragedBreeds([]);
    }
    setEmpty();
  };

  const handleBreedCheckbox = (option: string) => {
    const excludeFromStorage = (option: string) => {
      const filteredBreeds = storagedBreeds.filter((breed) => breed !== option);
      setStoragedBreeds(filteredBreeds);
    };

    const includeToStorage = (option: string) => {
      const extendedBreeds = [...storagedBreeds, option].sort();
      setStoragedBreeds(extendedBreeds);
    };

    const isBreedSelected = storagedBreeds.includes(option);

    if (isBreedSelected) {
      excludeFromStorage(option);
    }
    if (!isBreedSelected) {
      includeToStorage(option);
    }
    setEmpty();
  };

  const filterBreeds = (userInput: string) => {
    setKeyword(userInput);
  };

  return (
    <div className={styles.mainSelectBreed}>
      <Head>
        <title>🐕 Select Breeds</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={styles.breeds}>
        <SearchBreedInput filterBreeds={filterBreeds} />
        <div className={styles.breed}>
          <BreedCheckbox
            handleCheckbox={handleSelectAll}
            breed='Select All'
            isChecked={isSelectAll}
          />
        </div>
        {breeds
          .filter((breed) => breed.includes(keyword))
          .map((breed) => {
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
