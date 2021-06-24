import React, { useState, useEffect } from "react";

import { useAppContext } from "../../context";
import { FullScreenButton } from "../Buttons/FullScreenButton/FullScreenButton";
import { RemoveFromLikeListButton } from "../Buttons/RemoveFromLikeListButton/RemoveFromLikeListButton";
import { LikedDogModal } from "../LikedDogModal/LikedDogModal";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import style from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs, modalDetails, setModalDetails } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeoutID = window.setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => window.clearTimeout(timeoutID);
  }, []);

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
      {!loading &&
        likedDogs &&
        likedDogs.map((dog, index) => {
          return (
            <div key={`${dog.image}${index}`} className={style.likedDog}>
              <img className={style.likedDogImage} src={dog.image} alt='dog' />

              <div className={style.likedDogTitle}>
                <div className={style.title}>
                  <p>{dog.breed}</p>
                  <FullScreenButton
                    image={dog.image}
                    breed={dog.breed}
                    handleModalOpening={handleModalOpening}
                  />
                  <RemoveFromLikeListButton image={dog.image} />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
