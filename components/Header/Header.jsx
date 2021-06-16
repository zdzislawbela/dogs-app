import React, { useEffect, useState } from "react";
import Link from "next/link";

import Menu from "../Menu/Menu";
import styles from "./Header.module.css";

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
      className={`${styles.header} ${
        scrolled ? styles.headerOnScroll : styles.headerOnTop
      }`}
    >
      <a className={styles.headerLogo} href='/'>
        <Link href='/'>
          <a>🐕 Home</a>
        </Link>
      </a>
      <Menu />
    </div>
  );
};

export default Header;
