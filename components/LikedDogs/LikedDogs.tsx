import React, { useState } from 'react';

import { useAppContext } from '../../context';
import { FullScreenButton } from '../Buttons/FullScreenButton/FullScreenButton';
import { RemoveFromLikeListButton } from '../Buttons/RemoveFromLikeListButton/RemoveFromLikeListButton';
import { LikedDogModal } from '../LikedDogModal/LikedDogModal';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

import style from './LikedDogs.module.scss';

export const LikedDogs = () => {
  const { likedDogs, modalDetails, setModalDetails } = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleModalOpening = (image: string, breed: string) => {
    if (modalDetails) {
      return setModalDetails(null);
    }
    setModalDetails({ image, breed });
  };

  return (
    <>
      {modalDetails && <LikedDogModal />}

      {loading && <LoadingSpinner />}

      {likedDogs?.map(({ image, breed }, index) => {
        return (
          <div key={`${image}${index}`} className={style.likedDog}>
            <button
              className={style.buttonOnImage}
              onClick={() => handleModalOpening(image, breed)}
            ></button>
            <img className={style.likedDogImage} src={image} alt="dog" />

            <div className={style.likedDogTitle}>
              <div className={style.title}>
                <p>{breed}</p>
                <FullScreenButton
                  image={image}
                  breed={breed}
                  handleModalOpening={handleModalOpening}
                />
                <RemoveFromLikeListButton image={image} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
