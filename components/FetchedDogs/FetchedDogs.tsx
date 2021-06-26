import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import {
  DogDetails,
  DogsDetails,
  likedDogsDetails,
  useAppContext,
} from "../../context";

import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import style from "./FetchedDogs.module.css";
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
    likedDogs,
    setLikedDogs,
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

  const handleDoubleClick = (image: string, breed: string) => {
    clearTimeout(0);

    const images = likedDogs.map((dog) => dog.image);
    const isLiked = images.includes(image);

    if (isLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
      return;
    }

    const newLikedDog = { image, breed };
    const newLikedDogs: likedDogsDetails = [...likedDogs, newLikedDog];
    setLikedDogs(newLikedDogs);

    setTimeout(() => {
      return;
    }, 200);
  };

  return (
    <div className={style.dogsContainer}>
      <div className={style.container}>
        {fetchedDogs &&
          fetchedDogs.map(({ image, breedName, time }, index) => {
            const isLast = fetchedDogs.length === index + 1;
            return (
              <div
                className={style.dog}
                key={`${time} | ${image}`}
                ref={isLast ? useIntersectionObserver : undefined}
              >
                <button
                  className={style.coverFetchedDogImage}
                  onDoubleClick={() => handleDoubleClick(image, breedName)}
                ></button>

                <img className={style.dogImg} src={image} alt='dog' />

                <div className={style.dogCaption}>
                  <HeartButton image={image} breed={breedName} />
                  <p className={style.dogtitle}>{breedName}</p>
                </div>
              </div>
            );
          })}

        <div className={style.dog}>
          <div className={style.dogImg}>
            <img
              className={style.dogImg}
              src='/loading-dog.jpg'
              alt='loading img placeholder'
            />
            <LoadingSpinner />
          </div>
          <div className={style.titleContainer}></div>
        </div>
      </div>
    </div>
  );
};
