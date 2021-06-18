import React from "react";
import Link from "next/link";

import { KebabMenu } from "../KebabMenu/KebabMenu";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <div className={style.header}>
      <Link href='/'>
        <button className={style.headerButton}>
          <a> Home 🏠</a>
        </button>
      </Link>
      |
      <Link href='/fetch'>
        <button className={style.headerButton}>
          <a> Fetch 🐕</a>
        </button>
      </Link>
      |
      <Link href='/liked'>
        <button className={style.headerButton}>
          <a> Liked ❤️</a>
        </button>
      </Link>
      <KebabMenu />
    </div>
  );
};
