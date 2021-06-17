import React from "react";
import style from "./PageNavArrows.module.css";

export const PageNavArrows = () => {
  const handleScrollUp = () => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScrollDown = () => {
    scroll({
      top: document.documentElement.scrollTop + 400,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <button
        onClick={handleScrollUp}
        className={`${style.button} ${style.up}`}
      >
        UP
      </button>

      <button
        onClick={handleScrollDown}
        className={`${style.button} ${style.down}`}
      >
        DOWN
      </button>
    </div>
  );
};
