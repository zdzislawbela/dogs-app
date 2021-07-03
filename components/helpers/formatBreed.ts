export const formatBreed = (breed: string) => {
  const removeSlash = (breed: string) => {
    if (!breed.includes("/")) return breed;

    const [mainBreed, subBreed] = breed.split("/");
    return `${subBreed} ${mainBreed}`;
  };

  const capitalizeFirstLetter = (breed: string) => {
    return breed.charAt(0).toUpperCase() + breed.slice(1);
  };

  const removedSlash = removeSlash(breed);
  return capitalizeFirstLetter(removedSlash);
};
