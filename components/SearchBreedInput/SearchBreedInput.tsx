import React from "react";
import style from "./SearchBreedInput.module.css";

export const SearchBreedInput = () => {
  return (
    <div className={style.inputContainer}>
      <input
        className={style.input}
        placeholder='Search'
        type='text'
        value=''
      />
      <div className={style.loupeContainer}>
        <img className={style.loupe} src='/loupe.png' alt='Loupe' />
      </div>
    </div>
  );
};
