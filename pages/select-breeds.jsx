import Head from "next/head";
import React from "react";

import { useAppContext } from "../context";

import { BreedCheckbox } from "../components/BreedCheckbox/BreedCheckbox";
import { SearchBreedInput } from "../components/SearchBreedInput/SearchBreedInput";
import { useLocalStorage } from "../hooks/useLocalStorage";

import styles from "../styles/Page.module.css";

export default function SelectBreeds() {
  const {
    setDogs,
    dogBreedsContainer,
    setDogBreedsContainer,
    isSelectAll,
    setIsSelectAll,
    setBreedsChanged,
  } = useAppContext();

  const [breedsToStorage, setBreedsToStorage] = useLocalStorage(
    "selectedBreeds",
    ""
  );
  const storageIsNoSelection = breedsToStorage === "no-selection";
  const storageIsEmptyString = breedsToStorage == "";

  const handleSelectAll = () => {
    setDogs([]);
    setBreedsChanged(true);
    setIsSelectAll(!isSelectAll);
    const selectedBreeds = dogBreedsContainer.map(({ name }) => {
      return { name: name, checked: !isSelectAll };
    });

    if (!isSelectAll) {
      const breedsToStorageArray = dogBreedsContainer.map((breed) => {
        return breed.name;
      });
      const selectedBreedsString = breedsToStorageArray.join(",");
      setBreedsToStorage(selectedBreedsString);
    }
    if (isSelectAll) {
      setBreedsToStorage("no-selection");
    }
    setDogBreedsContainer(selectedBreeds);
  };

  const handleBreedCheckbox = (option) => {
    setDogs([]);
    setBreedsChanged(true);
    const selectedBreeds = dogBreedsContainer.map(({ name, checked }) => {
      if (name === option) {
        return { name: name, checked: !checked };
      }
      return { name: name, checked: checked };
    });
    setDogBreedsContainer(selectedBreeds);

    const storageExist = window.localStorage.getItem("selectedBreeds");

    const initialStorageWithoutSelected = (option) => {
      const breedsToStorageArray = dogBreedsContainer.map((breed) => {
        return breed.name;
      });
      const selectedBreed = (breed) => breed !== option;
      const filteredBreeds = breedsToStorageArray.filter(selectedBreed);
      const selectedBreedsString = filteredBreeds.join(",");
      setBreedsToStorage(selectedBreedsString);
    };

    const excludeFromStorage = (option) => {
      const breedsToStorageArray = breedsToStorage.split(",");
      const selectedBreed = (breed) => breed !== option;
      const filteredBreeds = breedsToStorageArray.filter(selectedBreed);
      const selectedBreedsString = filteredBreeds.join(",");
      setBreedsToStorage(selectedBreedsString);
    };

    const includeToStorage = (option) => {
      const breedsToStorageArrya = breedsToStorage.split(",");
      breedsToStorageArrya.push(option);
      breedsToStorageArrya.sort();
      const selectedBreedsString = breedsToStorageArrya.join(",");
      setBreedsToStorage(selectedBreedsString);
    };

    if (!storageExist) {
      initialStorageWithoutSelected(option);
    } else {
      if (breedsToStorage.includes(option)) {
        excludeFromStorage(option);
      }

      if (!breedsToStorage.includes(option)) {
        includeToStorage(option);
      }
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
        {dogBreedsContainer.map(({ name, checked }) => {
          let isChechedWithStorage = true;

          if (storageIsEmptyString) {
            if (checked) {
              isChechedWithStorage = true;
            }

            if (!checked) {
              isChechedWithStorage = false;
            }
          } else {
            const localStorageIncludes = breedsToStorage.includes(name);

            if (localStorageIncludes) {
              isChechedWithStorage = true;
            }

            if (!localStorageIncludes) {
              isChechedWithStorage = false;
            }
          }

          return (
            <div key={name} className={styles.breed}>
              <BreedCheckbox
                handleCheckbox={handleBreedCheckbox}
                breed={name}
                isChecked={isChechedWithStorage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
