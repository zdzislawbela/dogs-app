import React, { useState, useEffect, useRef, useCallback } from "react";

import { dogBreeds } from "./dogs";

import styles from "./FetchDogsOnScroll.module.css";

export const FetchDogsOnScroll = () => {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState("beagle");
  const [error, setError] = useState(false);
  const [apiCallCounter, setApiCallCounter] = useState(0);
  const observer = useRef();

  const dogsAPI = `https://dog.ceo/api/breed/${breed}/images/random`;
  // const dogsAPI = ``;

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
    }, 500);

    return () => window.clearTimeout(timeoutID);
  }, [breed, dogsAPI]);

  return (
    <div className={styles.container}>
      <a className={styles.fixedTopLeft} href='/'>
        <div>🐕 App</div>
      </a>
      <div className={styles.fixedTopRight}>Fetched dogs: {apiCallCounter}</div>

      <div className={styles.dogsContainer}>
        {dogs.map((dog) => {
          const breedTitle = dog.message.slice(
            30,
            getPosition(dog.message, "/", 5)
          );

          return (
            <div key={dog.message} className={styles.dog}>
              <img className={styles.dogImg} src={dog.message} alt='dog' />
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
