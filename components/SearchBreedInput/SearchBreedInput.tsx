import Link from 'next/link';
import React, { useState } from 'react';
import style from './SearchBreedInput.module.scss';

type Props = {
  filterBreeds: (userInput: string) => void;
};

export const SearchBreedInput = ({ filterBreeds }: Props) => {
  const [search, setSearch] = useState('');

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const keyword = e.currentTarget.value.toLowerCase();
    setSearch(keyword);
    filterBreeds(keyword);
  };

  const handleDeleteText = () => {
    setSearch('');
    filterBreeds('');
  };

  return (
    <div className={style.inputContainer}>
      <div className={style.inputFiled}>
        <input
          className={style.input}
          placeholder="Select breed"
          type="text"
          value={search}
          onChange={(e) => handleOnChange(e)}
        />
        <div className={style.loupeContainer}>
          <img className={style.loupe} src="/loupe.png" alt="Loupe" />
        </div>
        <div className={style.deleteTextContainer}>
          <button onClick={handleDeleteText} className={style.deleteTextButton}>
            <img
              src="/delete-input-text.png"
              alt="Delete"
              className={style.deleteInputIcon}
              width={20}
              height={17}
            />
          </button>
        </div>
      </div>
      <Link href="/fetch">
        <button className={style.fetchButton}>Fetch!</button>
      </Link>
    </div>
  );
};
