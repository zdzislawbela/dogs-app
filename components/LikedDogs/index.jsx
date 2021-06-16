import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useAppContext } from "../../context";
import styles from "./LikedDogs.module.css";

export const LikedDogs = () => {
  const { likedDogs, setIsModalOpen } = useAppContext();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <pre className={styles.containerPre}>
        <HighlightOffIcon
          onClick={handleClose}
          className={styles.closingIcon}
        />
        {likedDogs &&
          likedDogs.map((dog, index) => {
            return (
              <div key={`${dog.image}${index}`} className={styles.dog}>
                <div className={styles.imgContainer}>
                  <img className={styles.dogImg} src={dog.image} alt='dog' />
                </div>
                <p className={styles.dogImgTitle}>{dog.breed}</p>
              </div>
            );
          })}
      </pre>
    </div>
  );
};
