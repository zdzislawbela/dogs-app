import Head from 'next/head';
import React, { useState } from 'react';

import { useAppContext } from '../context/AppContext';
import { BreedCheckbox } from '../components/BreedCheckbox/BreedCheckbox';
import { SearchBreedInput } from '../components/SearchBreedInput/SearchBreedInput';
import { useSwipeable } from 'react-swipeable';

import styles from '../styles/Page.module.css';
import router from 'next/router';

export default function Filter() {
  const {
    setEmpty,
    isSelectAll,
    setIsSelectAll,
    storagedBreeds,
    setStoragedBreeds,
    breeds,
  } = useAppContext();
  const [keyword, setKeyword] = useState('');

  const handleSwipeLeft = () => {
    router.push('/');
  };

  const handleSwipeRight = () => {
    router.push('/');
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

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
    <>
      <Head>
        <title>🐕 Select Breeds</title>
      </Head>

      <div {...handlers} className={styles.mainSelectBreed}>
        <div className={styles.breeds}>
          <SearchBreedInput filterBreeds={filterBreeds} />
          <div className={styles.breed}>
            <BreedCheckbox
              handleCheckbox={handleSelectAll}
              breed="Select All"
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
    </>
  );
}
