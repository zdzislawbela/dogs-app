import { useEffect, useState } from "react";
import { DogDetails } from "../context";
import { breedsData } from "../data/breedsData";
import { useLocalStorage } from "./useLocalStorage";
import { getRandomArrayIndex } from "../utils/getRandomArrayIndex";

type FetchedDog = {
  message: string;
  status: string;
};

type UseDogs = {
  dogs: DogDetails[];
  loading: boolean;
  error?: Error;
  loadMore: () => Promise<void>;
};

export const useDogs = (initalHowMany = 10): UseDogs => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [dogs, setDogs] = useState<DogDetails[]>([]);

  const [storagedBreeds] = useLocalStorage<string[]>(
    "selectedBreeds",
    breedsData
  );

  const loadMore = async (howMany = 4) => {
    setLoading(true);

    const getDog = async () => {
      const randomIndex = getRandomArrayIndex(storagedBreeds);
      const breedName = storagedBreeds[randomIndex];
      const DOGS_API = "https://dog.ceo/api/breed/";
      const RANDOM_IMAGE = "/images/random";

      const response = await fetch(`${DOGS_API}${breedName}${RANDOM_IMAGE}`);

      if (response.status !== 200) {
        throw new Error("Download error");
      }

      const fetchedDog = (await response.json()) as FetchedDog;
      const timeInMs = Date.now();

      return {
        status: fetchedDog.status,
        breedName,
        image: fetchedDog.message,
        time: timeInMs,
      } as DogDetails;
    };

    try {
      const promises = Array(howMany)
        .fill(null)
        .map(() => {
          return getDog();
        });
      const newDogDetails = await Promise.allSettled(promises);

      const fulfilledNewDogDetails = newDogDetails
        .filter((promise) => promise.status === "fulfilled")
        .map((fulfilledPromise) => {
          //@ts-ignore
          return fulfilledPromise.value as DogDetails;
        });

      setDogs((currentDogs) => [...currentDogs, ...fulfilledNewDogDetails]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore(initalHowMany);
  }, []);

  return { dogs, loading, error, loadMore };
};
