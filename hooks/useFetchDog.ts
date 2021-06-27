import { DogDetails } from "../context";

type fetchedDog = {
  message: string;
  status: string;
};

const getPosition = (string: string, subString: string, index: number) => {
  return string.split(subString, index).join(subString).length;
};

export const useFetchDog = async (breed = "beagle") => {
  const timeInMs = Date.now();

  const response = await fetch(
    `https://dog.ceo/api/breed/${breed}/images/random`
  );
  const fetchedDog: fetchedDog = await response.json();

  const newDogsDetails: DogDetails = {
    status: fetchedDog.status,
    breedName: fetchedDog.message.slice(
      30,
      getPosition(fetchedDog.message, "/", 5)
    ),
    image: fetchedDog.message,
    time: timeInMs,
  };

  return newDogsDetails;
};
