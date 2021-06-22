import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { DogDetails, DogsDetails, useAppContext } from "../../context";

import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import styles from "./FetchedDogs.module.css";

export const FetchedDogs = () => {
  const {
    loading,
    setLoading,
    fetchedDogs,
    setFetchedDogs,
    setIsError,
    apiCallCounter,
    setApiCallCounter,
  } = useAppContext();

  const [breed, setBreed] = useState("");
  const [random, setRandom] = useState(0);
  const [storagedBreeds] = useLocalStorage("selectedBreeds", "");

  const observer = useRef<null | IntersectionObserver>(null);

  const getRandomBreed = () => {
    setRandom(Math.floor(Math.random() * storagedBreeds.length));

    if (random === 0 || random === 1) {
      setRandom(-1);
    }

    setBreed(storagedBreeds[random]);
    return storagedBreeds[random];
  };

  const useIntersectionObserver = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const randomBreedFromSelected = getRandomBreed();
          setBreed(randomBreedFromSelected);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const getPosition = (string: string, subString: string, index: number) => {
    return string.split(subString, index).join(subString).length;
  };
  useEffect(() => {
    getRandomBreed();
  }, []);

  useEffect(() => {
    setLoading(true);
    setIsError(false);

    const fetchDog = async () => {
      if (breed !== undefined) {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );

        if (response.status !== 200) {
          return setIsError("Something goes wrong. Please try again.");
        }
        const newDog: DogDetails = await response.json();
        const addNewDog: DogsDetails = [...fetchedDogs, newDog];
        setFetchedDogs(addNewDog);

        const addAPICall: number = apiCallCounter + 1;
        setApiCallCounter(addAPICall);
      }
    };

    const timeoutID = window.setTimeout(() => {
      fetchDog();
      setLoading(false);
      setIsError(false);
    }, 100);
    observer.current;

    return () => window.clearTimeout(timeoutID);
  }, [breed]);

  return (
    <div className={styles.dogsContainer}>
      <div className={styles.container}>
        {fetchedDogs &&
          fetchedDogs.map((dog, index) => {
            const breedTitle = dog.message.slice(
              30,
              getPosition(dog.message, "/", 5)
            );
            const isLast = fetchedDogs.length === index + 1;
            return (
              <div
                key={dog.message}
                className={styles.dog}
                ref={useIntersectionObserver}
              >
                <img className={styles.dogImg} src={dog.message} alt='dog' />

                <div className={styles.titleContainer}>
                  <HeartButton message={dog.message} breed={breedTitle} />

                  <p className={styles.title}>{breedTitle}</p>
                </div>
              </div>
            );
          })}

        <div className={styles.dog} ref={useIntersectionObserver}>
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
