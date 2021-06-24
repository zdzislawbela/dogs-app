import React, { useState } from "react";
import style from "./SearchBreedInput.module.css";

type Props = {
  filterBreeds: (userInput: string) => void;
};

export const SearchBreedInput = ({ filterBreeds }: Props) => {
  const [search, setSearch] = useState("");

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    filterBreeds(e.currentTarget.value);
  };

  return (
    <div className={style.inputContainer}>
      <input
        className={style.input}
        placeholder='Search'
        type='text'
        value={search}
        onChange={(e) => handleOnChange(e)}
      />
      <div className={style.loupeContainer}>
        <img className={style.loupe} src='/loupe.png' alt='Loupe' />
      </div>
    </div>
  );
};
