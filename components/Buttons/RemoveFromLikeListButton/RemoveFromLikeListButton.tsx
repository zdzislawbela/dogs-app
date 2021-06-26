import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useAppContext } from "../../../context";

import styles from "./RemoveFromLikeListButton.module.css";

type Props = {
  image: string;
};

export const RemoveFromLikeListButton = ({ image }: Props) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const removeFromLikeList = () => {
    const filteredLikedDogs = likedDogs.filter((dog) => dog.image !== image);
    setLikedDogs(filteredLikedDogs);
  };

  return (
    <button className={styles.closingIcon} onClick={removeFromLikeList}>
      <HighlightOffIcon />
    </button>
  );
};
