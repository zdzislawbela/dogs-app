import React from "react";
import { likedDogsDetails, useAppContext } from "../../../context";

import style from "./HeartButton.module.css";

type HeartButton = {
  message: string;
  breed: string;
};

export const HeartButton = ({ message, breed }: HeartButton) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const messages = likedDogs.map((dog) => dog.message);
  const isLiked = messages.includes(message);

  const handleLikeButton = () => {
    if (isLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.message !== message));
      return;
    }
    const likedDog = { message, breed };
    const addLikedDog: likedDogsDetails = [...likedDogs, likedDog];
    setLikedDogs(addLikedDog);
  };

  return (
    <button onClick={handleLikeButton} className={style.heartButton}>
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
