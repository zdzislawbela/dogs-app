export const getRandomArrayIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};
