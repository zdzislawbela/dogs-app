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
  loading: boolean;
  error?: Error;
  loadMore: (howMany?: number) => Promise<void>;
  dogs: DogDetails[];
  setEmpty: () => void;
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
      const addressToFetch = `${process.env.NEXT_PUBLIC_DOG_API}${breedName}/images/random`;

      const response = await fetch(addressToFetch);

      if (response.status !== 200) {
        throw new Error("Download error");
      }

      const fetchedDog = (await response.json()) as FetchedDog;
      const timeInMs = Date.now();

      return {
        status: fetchedDog.status,
        breedName,
        image: fetchedDog.message,
        downloadedAt: timeInMs,
      } as DogDetails;
    };

    try {
      const promises = Array(howMany).fill(null).map(getDog);

      const newDogDetails = await Promise.allSettled(promises);

      const fulfilledNewDogDetails = newDogDetails
        .filter((promise) => promise.status === "fulfilled")
        .map((fulfilledPromise) => {
          //@ts-ignore
          return fulfilledPromise.value as DogDetails;
        });

      setDogs((currentDogs) => [...currentDogs, ...fulfilledNewDogDetails]);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const setEmpty = () => setDogs([]);

  useEffect(() => {
    loadMore(initalHowMany);
  }, []);

  return { loading, error, loadMore, dogs, setEmpty };
};
