import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useAppContext } from "../../context";
import styles from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs } = useAppContext();

  const removeFromLikeList = () => {};

  return (
    <div className={styles.container}>
      {likedDogs &&
        likedDogs.map((dog, index) => {
          return (
            <div key={`${dog.image}${index}`} className={styles.dog}>
              <div className={styles.imgContainer}>
                <img className={styles.dogImg} src={dog.image} alt='dog' />
              </div>

              <div className={styles.dogImgTitle}>
                <p>{dog.breed}</p>

                <HighlightOffIcon
                  onClick={removeFromLikeList}
                  className={styles.closingIcon}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
