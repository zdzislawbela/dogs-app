import React, { useEffect, useState, useRef, useCallback } from "react";

import { likedDogsDetails, useAppContext } from "../../context";

import { HeartButton } from "../Buttons/HeartButton/HeartButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import style from "./FetchedDogs.module.css";
import Link from "next/link";

export const FetchedDogs = () => {
  const {
    loading,
    error,
    dogs,
    loadMore,
    isMosaic,
    likedDogs,
    setLikedDogs,
    storagedBreeds,
    loadBreeds,
  } = useAppContext();

  const [isScreenFilled, setIsScreenFilled] = useState(false);
  const observer = useRef<null | IntersectionObserver>(null);

  const waitForAll = () => {
    const DEFAULT_WAITING_TIME_IN_MLS = 2500;
    const MOSAIC_WAITING_TIME_IN_MLS = 6000;

    const miliSeconds = isMosaic
      ? MOSAIC_WAITING_TIME_IN_MLS
      : DEFAULT_WAITING_TIME_IN_MLS;

    setTimeout(() => {
      setIsScreenFilled(true);
    }, miliSeconds);
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
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

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

  useEffect(() => {
    loadMore();
    loadBreeds();
  }, []);

  return (
    <div
      className={
        isMosaic
          ? `${style.dogsContainer} ${style.mosaicDogsContainer}`
          : `${style.dogsContainer}`
      }
    >
      {storagedBreeds.length !== 0 &&
        dogs &&
        dogs.map(({ image, breedName, downloadedAt }, index) => {
          return (
            <div
              className={
                isMosaic ? `${style.dog} ${style.mosaicDog}` : `${style.dog}`
              }
              ref={useIntersectionObserver}
              key={`${downloadedAt} | ${image}`}
            >
              <button
                className={style.coverFetchedDogImage}
                onDoubleClick={() => handleDoubleClick(image, breedName)}
              ></button>

              <img
                className={
                  isMosaic
                    ? `${style.dogImg} ${style.mosaicDogImg}`
                    : `${style.dogImg}`
                }
                src={image}
                alt='dog'
              />

              <div
                className={
                  isMosaic
                    ? `${style.dogCaption} ${style.displayNone}`
                    : `${style.dogCaption}`
                }
              >
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
              <span>You didn't select any breed. </span>
              <span>Go to:</span>
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
