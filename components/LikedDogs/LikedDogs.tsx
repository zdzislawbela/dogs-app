import React, { useState, useEffect } from "react";

import { useAppContext } from "../../context";
import { RemoveFromLikeListButton } from "../Buttons/RemoveFromLikeListButton";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import styles from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs } = useAppContext();
  const [likedDogsState, setLikedDogsState] = useState(likedDogs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeoutID = window.setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => window.clearTimeout(timeoutID);
  }, [likedDogsState]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {!loading &&
        likedDogsState &&
        likedDogsState.map((dog, index) => {
          return (
            <div key={`${dog.message}${index}`} className={styles.dog}>
              <div className={styles.imgContainer}>
                <img className={styles.dogImg} src={dog.message} alt='dog' />
              </div>

              <div className={styles.dogImgTitle}>
                <div className={styles.title}>
                  <p>{dog.breed}</p>
                </div>
                <RemoveFromLikeListButton message={dog.message} />
              </div>
            </div>
          );
        })}
    </>
  );
};
