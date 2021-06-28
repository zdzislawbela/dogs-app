import React from "react";

import { useAppContext } from "../../context";

import style from "./DogsCounterBar.module.scss";

export const DogsCounterBar = () => {
  const { dogs, likedDogs } = useAppContext();

  const numberOfFetchedDogs = dogs.length;
  const numberOfLikedDogs = likedDogs.length;

  return (
    <div className={style.counterSideBar}>
      <div className={style.containerSideBar}>
        <p>🐕 {numberOfFetchedDogs}</p>
        <p>❤️ {numberOfLikedDogs}</p>
      </div>
    </div>
  );
};
