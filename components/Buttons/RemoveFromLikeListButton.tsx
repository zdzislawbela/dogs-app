import React from "react";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useAppContext } from "../../context";

import styles from "./RemoveFromLikeListButton.module.css";

type Props = {
  message: string;
};

export const RemoveFromLikeListButton = ({ message }: Props) => {
  const { likedDogs, setLikedDogs } = useAppContext();

  const removeFromLikeList = () => {
    setLikedDogs(likedDogs.filter((dog) => dog.message !== message));
  };

  return (
    <HighlightOffIcon
      onClick={removeFromLikeList}
      className={styles.closingIcon}
    />
  );
};
