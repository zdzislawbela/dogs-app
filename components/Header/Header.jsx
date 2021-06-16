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
      <Link href='/'>
        <div className={style.link}>
          <a> Home 🏠</a>
        </div>
      </Link>

      <Link href='/fetch'>
        <div className={style.link}>
          <a> Fetch 🐕</a>
        </div>
      </Link>

      <Link href='/liked'>
        <div className={style.link}>
          <a> Liked ❤️</a>
        </div>
      </Link>

      <Menu />
    </div>
  );
};

export default Header;
