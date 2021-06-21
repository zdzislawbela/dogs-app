import React, { useState } from "react";
import { useAppContext } from "../../../context/";

import style from "./HeartButton.module.css";

export const HeartButton = ({ image, breed }) => {
  const { likedDogs, setLikedDogs } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedStyle, setIsLikedStyle] = useState(false);

  const handleLike = () => {
    const images = likedDogs.map((dog) => dog.image);
    const checkIsLiked = images.includes(image);

    if (checkIsLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
      setIsLikedStyle(false);
      setIsLiked(false);
      return "";
    }

    setLikedDogs((likedDogs) => [...likedDogs, { image, breed }]);
    setIsLikedStyle(true);
    setTimeout(() => {
      setIsLiked(true);
    }, 900);
  };

  return (
    <button onClick={handleLike} className={style.heartButton}>
      {isLikedStyle && <div className={style.clickedHeartButton}></div>}

      <img
        src={isLiked ? "/likedHeart.png" : "/heart.png"}
        alt='Picture of heart'
        width={28}
        height={28}
      />
    </button>
  );
};
