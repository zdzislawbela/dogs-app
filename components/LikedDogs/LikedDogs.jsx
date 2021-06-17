import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useAppContext } from "../../context";
import { RemoveFromLikeListButton } from "../Buttons/RemoveFromLikeListButton";

import styles from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const removeFromLikeList = (e) => {
    console.log(e);
    setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
  };

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
                <div className={styles.title}>
                  <p>{dog.breed}</p>
                </div>
                <RemoveFromLikeListButton image={dog.image} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
