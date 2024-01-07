import React from 'react';
import { useAppContext } from '../../context';
import { LinkWithTooltip } from '../LinkWithTooltip';
import { ParticleBackground } from '../ParticleBackground';

import styles from './InfoModal.module.scss';

const moreDescription = `Dogs supplier: `;
const dogCeoLink = 'https://dog.ceo/';
const tooltipText =
  'The Dog CEO Dog API allows developers to access and integrate over 20,000 images of dogs from over 120 breeds with other applications. The images are supplied by the Stanford Dogs Dataset.';

export const InfoModal = () => {
  const { setIsInfoModalVisible } = useAppContext();

  return (
    <div className={styles.infoModal}>
      <h4 className={styles.title}>About 🐕 App</h4>

      <ParticleBackground />

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
  );
};
