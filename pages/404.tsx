import Link from "next/link";

import style from "../styles/Page.module.css";

export default function FourOhFour() {
  return (
    <>
      <div className={style.container}>
        <div className={style.fourOhFourContainer}>
          <h1 className={style.fourOhFour}>404</h1>
          <div className={style.fourOhFourText}>
            <h2 className={style.fourOhFourTextHeader}>
              This page could not be found.
            </h2>
          </div>
        </div>
        <button className={style.goBackHomeButton}>
          <Link href='/'>
            <a> Go back Home 🏠</a>
          </Link>
        </button>
      </div>
    </>
  );
}
