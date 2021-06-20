import Head from "next/head";
import React from "react";

import { useAppContext } from "../context";

import { BreedCheckbox } from "../components/BreedCheckbox/BreedCheckbox";
import { SearchBreedInput } from "../components/SearchBreedInput/SearchBreedInput";

import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const {
    dogBreedsContainer,
    setDogBreedsContainer,
    isSelectAll,
    setIsSelectAll,
  } = useAppContext();

  const handleSelectAll = () => {
    setIsSelectAll(!isSelectAll);
    const selectedBreeds = dogBreedsContainer.map(({ name }) => {
      return { name: name, checked: !isSelectAll };
    });
    setDogBreedsContainer(selectedBreeds);
  };

  const handleBreedCheckbox = (option) => {
    const selectedBreeds = dogBreedsContainer.map(({ name, checked }) => {
      if (name === option) {
        return { name: name, checked: !checked };
      }
      return { name: name, checked: checked };
    });
    setDogBreedsContainer(selectedBreeds);
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
        {dogBreedsContainer.map(({ name, checked }) => {
          return (
            <div key={name} className={styles.breed}>
              <BreedCheckbox
                handleCheckbox={handleBreedCheckbox}
                breed={name}
                isChecked={checked}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
