import React, { useEffect, useState } from "react";

import { useAppContext } from "../../context";
import style from "./DogsCounterBar.module.css";

export const DogsCounterBar = () => {
  const { fetchedDogs, likedDogs } = useAppContext();
  const [fetchedDogTitle, setFetchedDogTitle] = useState("");
  const [likedDogsTitle, setLikedDogsTitle] = useState("");

  useEffect(() => {
    const numberOfFetchedDogs = fetchedDogs.length;
    const numberOfLikedDogs = likedDogs.length;

    setFetchedDogTitle(`🐕 ${numberOfFetchedDogs}`);
    setLikedDogsTitle(`❤️ ${numberOfLikedDogs}`);
  }, [fetchedDogs, likedDogs]);

  return (
    <div className={style.counterSideBar}>
      <div className={style.containerSideBar}>
        <p>{fetchedDogTitle}</p> <p>{likedDogsTitle}</p>
      </div>
    </div>
  );
};
