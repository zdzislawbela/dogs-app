import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { DogDetails, DogsDetails, useAppContext } from "../../context";

import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import styles from "./FetchedDogs.module.css";
import { Breed } from "../../data/breedsData";

type fetchedDog = {
  message: string;
  status: string;
};

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

  const [breed, setBreed] = useState<Breed>();
  const [random, setRandom] = useState(0);
  const [storagedBreeds] = useLocalStorage<Breed[]>("selectedBreeds", []);

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
      const timeInMs = Date.now();
      if (breed !== undefined) {
        const response = await fetch(
          `https://dog.ceo/api/breed/${breed}/images/random`
        );

        if (response.status !== 200) {
          return setIsError("Something goes wrong. Please try again.");
        }
        const fetchedDog: fetchedDog = await response.json();

        const newDog: DogDetails = {
          status: fetchedDog.status,
          breedName: fetchedDog.message.slice(
            30,
            getPosition(fetchedDog.message, "/", 5)
          ),
          image: fetchedDog.message,
          time: timeInMs,
        };

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
            const isLast = fetchedDogs.length === index + 1;
            return (
              <div
                className={styles.dog}
                key={`${dog.time}|${dog.image}`}
                ref={isLast ? useIntersectionObserver : undefined}
              >
                <img className={styles.dogImg} src={dog.image} alt='dog' />

                <div className={styles.dogCaption}>
                  <HeartButton image={dog.image} breed={dog.breedName} />
                  <p className={styles.dogtitle}>{dog.breedName}</p>
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
