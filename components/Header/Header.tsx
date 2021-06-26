import React from "react";
import Link from "next/link";

import { KebabMenu } from "../KebabMenu/KebabMenu";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <div className={style.header}>
      <Link href='/'>
        <button className={style.headerButton}>
          <a className={style.mobile}> Home </a>🏠
        </button>
      </Link>
      |
      <Link href='/select-breeds'>
        <button className={style.headerButton}>
          <a className={style.mobile}> Select </a>🔎
        </button>
      </Link>
      |
      <Link href='/fetch'>
        <button className={style.headerButton}>
          <a className={style.mobile}> Fetch</a>🐕
        </button>
      </Link>
      |
      <Link href='/liked'>
        <button className={style.headerButton}>
          <a className={style.mobile}> Liked </a>❤️
        </button>
      </Link>
      |
      <KebabMenu />
    </div>
  );
};
