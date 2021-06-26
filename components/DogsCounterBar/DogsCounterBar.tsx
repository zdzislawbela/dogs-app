import React, { useEffect, useState } from "react";

import { useAppContext } from "../../context";
import style from "./DogsCounterBar.module.css";

export const DogsCounterBar = () => {
  const { fetchedDogs, likedDogs } = useAppContext();

  const numberOfFetchedDogs = fetchedDogs.length;
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
