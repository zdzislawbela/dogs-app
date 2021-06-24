import Head from "next/head";
import React, { useState } from "react";
import { Breed, breedsData } from "../data/breedsData";
import { useAppContext } from "../context";

import { BreedCheckbox } from "../components/BreedCheckbox/BreedCheckbox";
import { SearchBreedInput } from "../components/SearchBreedInput/SearchBreedInput";

import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const {
    setFetchedDogs,
    isSelectAll,
    setIsSelectAll,
    storagedBreeds,
    setStoragedBreeds,
  } = useAppContext();
  const [keyword, setKeyword] = useState("");

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

  const handleBreedCheckbox = (option: Breed) => {
    setFetchedDogs([]);

    const excludeFromStorage = (option: Breed) => {
      const filteredBreeds = storagedBreeds.filter((breed) => breed !== option);
      setStoragedBreeds(filteredBreeds);
    };

    const includeToStorage = (option: Breed) => {
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
  };
  const filterBreeds = (userInput: string) => {
    setKeyword(userInput);
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
        <SearchBreedInput filterBreeds={filterBreeds} />
        <p>Select breeds you'd like to fetch </p>
        <div className={styles.breed}>
          <BreedCheckbox
            handleCheckbox={handleSelectAll}
            breed='Select All'
            isChecked={isSelectAll}
          />
        </div>
        {breedsData
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
