import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "../../context";
import style from "./Heart.module.css";

export const Heart = ({ image, breed }) => {
  const { likedDogs, setLikedDogs } = useAppContext();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    const images = likedDogs.map((dog) => dog.image);
    const checkIsLiked = images.includes(image);

    if (checkIsLiked) {
      setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
      setIsLiked(false);
      return "";
    }

    setLikedDogs((likedDogs) => [...likedDogs, { image, breed }]);
    setIsLiked(true);
  };

  return (
    <>
      <button className={style.heartButton}>
        {isLiked ? (
          <Image
            onClick={handleLike}
            src='/likedHeart.png'
            alt='Picture of heart'
            width={24}
            height={24}
          />
        ) : (
          <Image
            onClick={handleLike}
            src='/heart.png'
            alt='Picture of heart'
            width={24}
            height={24}
          />
        )}
      </button>
    </>
  );
};
