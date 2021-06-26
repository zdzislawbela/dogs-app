import React from "react";
import style from "./MinimizeButton.module.scss";

type Props = {
  handleCloseModal: () => void;
};

export const MinimizeButton = ({ handleCloseModal }: Props) => {
  return (
    <button className={style.minimizeButton} onClick={handleCloseModal}>
      <img
        className={style.img}
        src='/minimize.png'
        alt='minimize'
        width={28}
        height={28}
      />
    </button>
  );
};
