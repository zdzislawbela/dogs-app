import React from "react";
import styles from "./PageNavArrows.module.css";

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
      <button onClick={handleScrollUp} className={styles.up}>
        UP
      </button>

      <button onClick={handleScrollDown} className={styles.down}>
        DOWN
      </button>
    </div>
  );
};
