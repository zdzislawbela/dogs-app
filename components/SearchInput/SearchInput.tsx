import React, { useState } from 'react';
import { Clear } from '../Icons/Clear';
import { Loupe } from '../Icons/Loupe';

import style from './SearchInput.module.scss';

interface Props {
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ onChange, placeholder }: Props) => {
  const [value, setValue] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setValue(value);
    onChange(value);
  };

  const handleDeleteSearch = () => {
    setValue;
    onChange('');
  };

  return (
    <div className={style.container}>
      <div className={style.inputWrapper}>
        <input
          className={style.input}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={handleOnChange}
        />
        <div className={style.loupeContainer}>
          <Loupe />
        </div>
        <button className={style.deleteButton} onClick={handleDeleteSearch}>
          <Clear />
        </button>
      </div>
    </div>
  );
};
