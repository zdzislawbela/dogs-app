import React from 'react';
import ReactTooltip from 'react-tooltip';

import styles from './LinkWithTooltip.module.scss';

interface Props {
  href: string;
  label?: string;
  tooltipText?: string;
}

const aboutDogCeoId = 'aboutDogCeoId';
export const LinkWithTooltip = ({ href, label, tooltipText }: Props) => {
  return (
    <div className={styles.container}>
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noreferrer"
        data-tip
        data-for={aboutDogCeoId}
      >
        {label ?? href}
      </a>

      <ReactTooltip
        id={aboutDogCeoId}
        place="bottom"
        delayShow={500}
        className={styles.tooltip}
      >
        {tooltipText}
      </ReactTooltip>
    </div>
  );
};
