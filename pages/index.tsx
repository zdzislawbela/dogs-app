import Head from "next/head";
import ButtonBases from "../components/Button/Button";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🐕 Home</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={styles.main}>
        <a href='/'>
          <h3 className={styles.title}>Welcome to 🐕 App</h3>
        </a>
        <div className={styles.buttonContainer}>
          <ButtonBases />
        </div>
      </div>
    </div>
  );
}
