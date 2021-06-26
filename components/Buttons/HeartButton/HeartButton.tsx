import React from "react";
import { likedDogsDetails, useAppContext } from "../../../context";

import style from "./HeartButton.module.css";

type HeartButton = {
  image: string;
  breed: string;
};

export const HeartButton = ({ image, breed }: HeartButton) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const images = likedDogs.map((dog) => dog.image);
  const isLiked = images.includes(image);

  const handleLikeButton = () => {
    if (isLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
      return;
    }
    const newLikedDog = { image, breed };
    const newLikedDogs: likedDogsDetails = [...likedDogs, newLikedDog];
    setLikedDogs(newLikedDogs);
  };

  return (
    <button onClick={handleLikeButton} className={style.heartButton}>
      {isLiked && <div className={style.clickedHeartButton}></div>}

      {isLiked && (
        <div className={style.clickedHeartGoTop}>
          <img
            src='/likedHeart.png'
            alt='Picture of heart'
            width={28}
            height={28}
          />
        </div>
      )}

      <img
        src={isLiked ? "/likedHeart.png" : "/heart.png"}
        alt='Picture of heart'
        width={28}
        height={28}
      />
    </button>
  );
};
