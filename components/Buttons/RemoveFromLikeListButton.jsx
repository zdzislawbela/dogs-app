import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useAppContext } from "../../context";

import styles from "./RemoveFromLikeListButton.module.css";

export const RemoveFromLikeListButton = ({ image }) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const removeFromLikeList = (e) => {
    console.log(e);
    setLikedDogs(likedDogs.filter((dog) => dog.image !== image));
  };

  return (
    <HighlightOffIcon
      onClick={removeFromLikeList}
      className={styles.closingIcon}
    />
  );
};
