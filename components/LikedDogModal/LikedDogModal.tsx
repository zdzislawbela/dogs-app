import React from 'react';

import { useAppContext } from '../../context/AppContext';
import { MinimizeButton } from '../Buttons/MinimizeButton/MinimizeButton';

import style from './LikedDogModal.module.css';

export const LikedDogModal = () => {
  const { modalDetails, setModalDetails } = useAppContext();

  const handleCloseModal = () => {
    setModalDetails(null);
  };

  return (
    <div className={style.fullScreenModal}>
      <button
        className={style.buttonOnFullScreen}
        onClick={handleCloseModal}
      ></button>

      <div className={style.likedDogModal}>
        <MinimizeButton handleCloseModal={handleCloseModal} />
        <img
          className={style.likedDogImage}
          src={modalDetails?.image}
          alt="dog"
        />

        <div className={style.likedDogTitle}>
          <div className={style.title}>
            <p>{modalDetails?.breed}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
