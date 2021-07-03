import { capitalize } from "./capitalize";

export const formatBreed = (breed: string) => {
  const [mainBreed, subBreed] = breed.split("/");

  if (!subBreed) {
    return capitalize(breed);
  }

  return `${capitalize(subBreed)} ${capitalize(mainBreed)}`;
};
