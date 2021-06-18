import React from "react";
import Link from "next/link";

import { KebabMenu } from "../KebabMenu/KebabMenu";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <div className={style.header}>
      <Link href='/'>
        <div className={style.headerButton}>
          <a> Home 🏠</a>
        </div>
      </Link>
      |
      <Link href='/fetch'>
        <div className={style.headerButton}>
          <a> Fetch 🐕</a>
        </div>
      </Link>
      |
      <Link href='/liked'>
        <div className={style.headerButton}>
          <a> Liked ❤️</a>
        </div>
      </Link>
      <KebabMenu />
    </div>
  );
};
