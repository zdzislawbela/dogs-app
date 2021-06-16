import React, { useEffect, useState } from "react";
import Link from "next/link";

import Menu from "../Menu/Menu";
import style from "./Header.module.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrolled(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  return (
    <div
      className={`${style.header} ${
        scrolled ? style.headerOnScroll : style.headerOnTop
      }`}
    >
      <div className={style.link}>
        <Link className={style.link} href='/'>
          <a> Home 🏠</a>
        </Link>
      </div>

      <div className={style.link}>
        <Link className={style.link} href='/fetch'>
          <a> Fetch 🐕</a>
        </Link>
      </div>

      <div className={style.link}>
        <Link href='/liked'>
          <a> Liked ❤️</a>
        </Link>
      </div>

      <Menu />
    </div>
  );
};

export default Header;
