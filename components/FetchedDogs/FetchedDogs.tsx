import React, { useState, useEffect, useRef, useCallback } from "react";
import { useFetchDog } from "../../hooks/useFetchDog";

import { likedDogsDetails, useAppContext } from "../../context";

import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import style from "./FetchedDogs.module.css";
import { Breed } from "../../data/breedsData";
import Link from "next/link";

export const FetchedDogs = () => {
  const {
    loading,
    setLoading,
    fetchedDogs,
    setFetchedDogs,
    likedDogs,
    setLikedDogs,
    setIsError,
    storagedBreeds,
  } = useAppContext();

  const [breed, setBreed] = useState<Breed>();
  const [random, setRandom] = useState(0);
  const [isScreenFilled, setIsScreenFilled] = useState(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const getNextDog = () => {
    setRandom(Math.floor(Math.random() * storagedBreeds.length));

    if (random === 0 || random === 1) {
      setRandom(-1);
    }

    setBreed(storagedBreeds[random]);

    return storagedBreeds[random];
  };

  const waitForAll = () => {
    setTimeout(() => {
      setIsScreenFilled(true);
    }, 2500);
  };
  waitForAll();

  const useIntersectionObserver = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getNextDog();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const fetchDog = () => {
    setLoading(true);
    useFetchDog(storagedBreeds[random]).then((newDog) => {
      setFetchedDogs([...fetchedDogs, newDog]);
      setLoading(false);
      observer.current;
    });
  };

  useEffect(() => {
    getNextDog();
    fetchDog();
  }, []);

  useEffect(() => {
    fetchDog();
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
      {storagedBreeds.length !== 0 &&
        fetchedDogs &&
        fetchedDogs.map(({ image, breedName, time }, index) => {
          return (
            <div
              ref={useIntersectionObserver}
              className={style.dog}
              key={`${time} | ${image}`}
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

      {storagedBreeds.length === 0 ? (
        <div className={style.noBreedsInfo}>
          <div className={style.dog}>
            <img
              className={style.dogImg}
              src='/loading-dog.jpg'
              alt='loading img placeholder'
            />
            <div className={style.contentCenter}>
              <div>You didn't select any breed.</div>
              <div>Go to:</div>
              <div>
                <Link href='/select-breeds'>
                  <button className={style.headerButton}>
                    <a> Select 🔎</a>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            isScreenFilled ? `${style.dog}` : `${style.fullscreenCoverLoading}`
          }
        >
          <div className={style.dogImgCover}>
            <img
              className={style.dogImg}
              src='/loading-dog.jpg'
              alt='loading img placeholder'
            />
            <LoadingSpinner />
          </div>
          <div className={style.dogCaption}>
            <p className={style.dogtitle}>LOADING</p>
          </div>
        </div>
      )}
    </div>
  );
};
