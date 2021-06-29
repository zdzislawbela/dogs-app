import Head from "next/head";
import MainButton from "../components/Buttons/MainButton/MainButton";
import styles from "../styles/Page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🐕 Pictures of dogs</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className={styles.main}>
        <h3 className={styles.title}>Welcome to 🐕 App</h3>

        <div className={styles.buttonsContainer}>
          <MainButton
            title='Select breeds'
            url='/dog-breeds-button.jpg'
            href='/select-breeds'
          />
          <MainButton
            title='Start fetching'
            url='/start-fetching-button.jpg'
            href='/fetch'
          />
        </div>
      </div>
    </div>
  );
}
