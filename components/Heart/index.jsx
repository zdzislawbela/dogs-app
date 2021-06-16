import React, { useState } from "react";
import { useAppContext } from "../../context";
import style from "./Heart.module.css";

export const Heart = ({ newDog, image, breed }) => {
  const { likedDogs, setLikedDogs } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const images = likedDogs.map((dog) => dog.image);
    const checkIsLiked = images.includes(image);

    if (checkIsLiked) {
      return "";
    }

    setLikedDogs((likedDogs) => [...likedDogs, { image, breed }]);
    setIsLiked(true);
  };

  return (
    <div
      onClick={handleLike}
      className={`${style.heart} ${isLiked ? style.likedHeart : ""}`}
    >
      <div className={`${isLiked ? style.isLiked : style.disabled}`}>
        Liked!
      </div>
    </div>
  );
};
