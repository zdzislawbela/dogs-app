import React, { useState } from "react";
import { useAppContext } from "../../../context/";

import style from "./HeartButton.module.css";

export const HeartButton = ({ image, breed }) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const images = likedDogs.map((dog) => dog.image);
  const isLiked = images.includes(image);

  const handleLike = () => {
    if (isLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
      return;
    }
    setLikedDogs((likedDogs) => [...likedDogs, { image, breed }]);
  };

  return (
    <button onClick={handleLike} className={style.heartButton}>
      {isLiked && <div className={style.clickedHeartButton}></div>}

      <img
        src={isLiked ? "/likedHeart.png" : "/heart.png"}
        alt='Picture of heart'
        width={28}
        height={28}
      />
    </button>
  );
};
