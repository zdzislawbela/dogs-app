import React from 'react';

import style from './ParticleBackground.module.scss';

const particles = [
  '🐕',
  '🌭',
  '🐕',
  '🌭',
  '🐕',
  '🌭',
  '🐕',
  '🌭',
  '🦮',
  '🐕‍🦺',
  '🦴',
  '🐶',
  '🦮',
  '🦴',
  '🐕‍🦺',
  '🐶',
  '🐩',
  '🦴',
  '🐾',
  '🦴',
  '💩',
  '💩',
  '💩',
  '💩',
  '🐺',
  '❤️',
];

export const ParticleBackground = () => {
  return (
    <div className={style.particleContainer}>
      {particles.map((particle) => {
        return (
          <button className={style.particle}>
            <div className={style.particleEmoji}>{particle}</div>
          </button>
        );
      })}
    </div>
  );
};
