export const formatBreed = (breed: string) => {
  const [mainBreed, subBreed] = breed.split("/");

  if (!subBreed) {
    return breed.charAt(0).toUpperCase() + breed.slice(1);
  }

  return `${subBreed.charAt(0).toUpperCase() + subBreed.slice(1)} ${
    mainBreed.charAt(0).toUpperCase() + mainBreed.slice(1)
  }`;
};
