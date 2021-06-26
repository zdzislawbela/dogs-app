import React from "react";
import style from "./FullScreenButton.module.scss";

type Props = {
  image: string;
  breed: string;
  handleModalOpening: (image: string, breed: string) => void;
};

export const FullScreenButton = ({
  image,
  breed,
  handleModalOpening,
}: Props) => {
  return (
    <button
      className={style.fullScreenButton}
      onClick={() => handleModalOpening(image, breed)}
    >
      <img
        src='/fullscreen.png'
        alt='fullscreen'
        width={26}
        height={26}
        className={style.icon}
      />
    </button>
  );
};
