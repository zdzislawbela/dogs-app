import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { useAppContext } from "../../context";
import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import styles from "./FetchedDogs.module.css";

export const FetchedDogs = () => {
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
    dogBreedsContainer,
    breedsChanged,
    setBreedsChanged,
    dogsAPI,
  } = useAppContext();

  const [random, setRandom] = useState(0);

  const [breedsToStorage] = useLocalStorage("selectedBreeds", "");

  const observer = useRef();

  let userSelectedBreeds = dogBreedsContainer
    .map((breed) => {
      const localStorageIncludes = breedsToStorage.includes(breed.name);

      if (localStorageIncludes) {
        return breed.name;
      }
    })
    .filter((name) => {
      return name != undefined;
    });

  const getRandomBreed = () => {
    setRandom(Math.floor(Math.random() * userSelectedBreeds.length));

    if ((random === 0) | (random === 1)) {
      setRandom(-1);
    }

    return setBreed(userSelectedBreeds[random]);
  };

  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getRandomBreed();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
  };

  useEffect(() => {
    getRandomBreed();
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const fetchDog = async () => {
      const response = await fetch(dogsAPI);

      if (response.status !== 200) {
        return setError("Something goes wrong. Please try again.");
      }

      const newDog = await response.json();
      setDogs((dogs) => [...dogs, newDog]);
      setApiCallCounter((apiCallCounter) => apiCallCounter + 1);
    };

    const timeoutID = window.setTimeout(() => {
      fetchDog();
      setLoading(false);
      setError(false);
    }, 100);
    observer.current;

    return () => window.clearTimeout(timeoutID);
  }, [dogsAPI]);

  return (
    <div className={styles.dogsContainer}>
      <div className={styles.container}>
        {dogs &&
          dogs.map((dog, index) => {
            const breedTitle = dog.message.slice(
              30,
              getPosition(dog.message, "/", 5)
            );

            return (
              <div
                key={dog.message}
                className={styles.dog}
                ref={dogs.length === index + 1 ? lastBookElementRef : null}
              >
                <img className={styles.dogImg} src={dog.message} alt='dog' />

                <div className={styles.titleContainer}>
                  <HeartButton image={dog.message} breed={breedTitle} />

                  <p className={styles.title}>{breedTitle}</p>
                </div>
              </div>
            );
          })}

        <div className={styles.dog}>
          <div className={styles.dogImg}>
            <img
              className={styles.dogImg}
              src='/loading-dog.jpg'
              alt='loading img placeholder'
            />
            <LoadingSpinner />
          </div>
          <div className={styles.titleContainer}></div>
        </div>
      </div>
    </div>
  );
};
