import React from "react";
import style from "./MinimizeButton.module.css";

type Props = {
  handleCloseModal: () => void;
};

export const MinimizeButton = ({ handleCloseModal }: Props) => {
  return (
    <button className={style.minimizeButton} onClick={handleCloseModal}>
      <img src='/minimize.png' alt='minimize' width={26} height={26} />
    </button>
  );
};
