import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { likedDogsDetails, useAppContext } from '../../context';
import { HeartButton } from '../Buttons/HeartButton/HeartButton';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { formatBreed } from '../helpers/formatBreed';

import style from './FetchedDogs.module.css';

const DEFAULT_WAITING_TIME_IN_MLS = 2000;
const MOSAIC_WAITING_TIME_IN_MLS = 3000;

export const FetchedDogs = () => {
  const {
    loading,
    // error,
    dogs,
    loadMore,
    isMosaic,
    likedDogs,
    setLikedDogs,
    storagedBreeds,
  } = useAppContext();

  const [isScreenFilled, setIsScreenFilled] = useState(false);

  const observer = useRef<null | IntersectionObserver>(null);
  const milisecondsToReset = isMosaic
    ? MOSAIC_WAITING_TIME_IN_MLS
    : DEFAULT_WAITING_TIME_IN_MLS;

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

    const images = likedDogs.map(({ image }) => image);
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
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScreenFilled(true);
    }, milisecondsToReset);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowFetchedDogs = storagedBreeds.length !== 0 && dogs;

  return (
    <div
      className={clsx(style.dogsContainer, {
        [style.mosaicDogsContainer]: isMosaic,
      })}
    >
      {shouldShowFetchedDogs &&
        dogs.map(({ image, breedName, downloadedAt }) => {
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
                alt="dog"
              />

              <div
                className={
                  isMosaic
                    ? `${style.dogCaption} ${style.displayNone}`
                    : `${style.dogCaption}`
                }
              >
                <HeartButton image={image} breed={breedName} />

                <p className={style.dogtitle}>{formatBreed(breedName)}</p>
              </div>
            </div>
          );
        })}

      {storagedBreeds.length === 0 ? (
        <div className={style.noBreedsInfo}>
          <div className={style.dog}>
            <img
              className={style.dogImg}
              src="/loading-dog.jpg"
              alt="loading img placeholder"
            />
            <div className={style.contentCenter}>
              <span>You didn't select any breed. </span>
              <span>Go to:</span>
              <div>
                <Link href="/filter">
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
              src="/loading-dog.jpg"
              alt="loading img placeholder"
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
