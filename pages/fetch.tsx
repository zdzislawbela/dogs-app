import Head from "next/head";
import { FetchDogsOnScroll } from "../components/FetchDogsOnScroll/FetchDogsOnScroll";
import styles from "../styles/Home.module.css";

export default function Fetch() {
  return (
    <div>
      <Head>
        <title>🐕 Happy fetching!</title>
        <meta
          name='description'
          content='Collecting open source dog pictures from dog.ceo'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <FetchDogsOnScroll />
    </div>
  );
}
