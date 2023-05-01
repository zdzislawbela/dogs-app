import Head from 'next/head';
import MainButton from '../components/Buttons/MainButton/MainButton';
import { LinkWithTooltip } from '../components/LinkWithTooltip';
import styles from '../styles/Page.module.css';
import { useSwipeable } from 'react-swipeable';

import router from 'next/router';

const buttons = [
  { title: 'Select breed', url: '/dog-breeds-button.jpg', href: '/filter' },
  {
    title: 'Start fetching',
    url: '/start-fetching-button.jpg',
    href: '/fetch',
  },
];

const title = '🐕 Pictures of dogs';
const welcomeText = 'Welcome to Dogs App';
const description =
  'Here you can find a lot of loyal, active, playful, fluffy and excited dogs!';
const dogCeoLink = 'https://dog.ceo/';
const moreDescription = `Collection of open source dog pictures delivered by: `;
const tooltipText =
  'The Dog CEO Dog API allows developers to access and integrate over 20,000 images of dogs from over 120 breeds with other applications. The images are supplied by the Stanford Dogs Dataset.';

export default function Home() {
  const handleSwipeLeft = () => {
    router.push('/filter');
  };

  const handleSwipeRight = () => {
    router.push('/liked');
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div {...handlers} className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.title}>{welcomeText}</h1>

          <p className={styles.description}>{description}</p>
          <p className={styles.description}>
            {moreDescription}
            <LinkWithTooltip href={dogCeoLink} tooltipText={tooltipText} />
          </p>

          <div className={styles.buttonsContainer}>
            {buttons.map((button) => {
              return <MainButton key={button.href} {...button} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
