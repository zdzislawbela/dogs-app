import React, { useEffect, useRef, useCallback } from "react";

import { useAppContext } from "../../context";
import { dogBreeds } from "./dogs";
import { Heart } from "../Heart";
import styles from "./FetchedDogsContainer.module.css";

export const FetchedDogsContainer = () => {
  const {
    loading,
    setLoading,
    dogs,
    setDogs,
    breed,
    setBreed,
    error,
    setError,
    apiCallCounter,
    setApiCallCounter,
    dogsAPI,
  } = useAppContext();

  const observer = useRef();

  const getRandomBreed = () => {
    const random = Math.floor(Math.random() * dogBreeds.length);
    return setBreed(dogBreeds[random]);
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
  }, [breed, dogsAPI]);

  return (
    <div className={styles.container}>
      <div className={styles.dogsContainer}>
        {dogs &&
          dogs.map((dog) => {
            const breedTitle = dog.message.slice(
              30,
              getPosition(dog.message, "/", 5)
            );

            return (
              <div key={dog.message} className={styles.dog}>
                <div className={styles.imgContainer}>
                  <img className={styles.dogImg} src={dog.message} alt='dog' />
                  <Heart />
                </div>
                <p className={styles.dogImgTitle}>{breedTitle}</p>
              </div>
            );
          })}

        <div>
          <div className={styles.loading} ref={lastBookElementRef}>
            {error && `${error}`} Loading...
          </div>
        </div>
      </div>
    </div>
  );
};
