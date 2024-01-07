import Head from 'next/head';
import React from 'react';
import { LinkWithTooltip } from '../components/LinkWithTooltip';

import styles from '../styles/Page.module.css';

const moreDescription = `Dogs supplier: `;
const dogCeoLink = 'https://dog.ceo/';
const tooltipText =
  'The Dog CEO Dog API allows developers to access and integrate over 20,000 images of dogs from over 120 breeds with other applications. The images are supplied by the Stanford Dogs Dataset.';

export default function About() {
  return (
    <>
      <Head>
        <title>🐕 About</title>
      </Head>

      <div className={styles.container}>
        <h4 className={styles.title}>About 🐕 App</h4>
        <div className={styles.aboutContainer}>
          <a
            href="https://github.com/zdzislawbela/dogs-app"
            target="_blank"
            rel="noreferrer"
          >
            Source code
          </a>

          <div>
            <span>
              {moreDescription}
              <LinkWithTooltip href={dogCeoLink} tooltipText={tooltipText} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
