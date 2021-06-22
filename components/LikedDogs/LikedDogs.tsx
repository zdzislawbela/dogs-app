import React from "react";

import { useAppContext } from "../../context";
import { RemoveFromLikeListButton } from "../Buttons/RemoveFromLikeListButton";

import styles from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs } = useAppContext();

  return (
    <div className={styles.container}>
      {likedDogs &&
        likedDogs.map((dog, index) => {
          return (
            <div key={`${dog.message}${index}`} className={styles.dog}>
              <div className={styles.imgContainer}>
                <img className={styles.dogImg} src={dog.message} alt='dog' />
              </div>

              <div className={styles.dogImgTitle}>
                <div className={styles.title}>
                  <p>{dog.breed}</p>
                </div>
                <RemoveFromLikeListButton image={dog.message} />
              </div>
            </div>
          );
        })}
    </div>
  );
};