import React from "react";
import style from "./FullScreenButton.module.css";

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
      <img src='/fullscreen.png' alt='fullscreen' width={26} height={26} />
    </button>
  );
};
