import React, { useState } from "react";
import style from "./SearchBreedInput.module.css";

export const SearchBreedInput = () => {
  const [search, setSearch] = useState("");

  return (
    <div className={style.inputContainer}>
      <input
        className={style.input}
        placeholder='Search'
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={style.loupeContainer}>
        <img className={style.loupe} src='/loupe.png' alt='Loupe' />
      </div>
    </div>
  );
};
