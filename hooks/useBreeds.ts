import { useEffect, useState } from 'react';
import { useAppContext } from '../context';

type UseBreeds = {
  breeds: string[];
  loadingBreeds: boolean;
  errorBreeds?: unknown;
  loadBreeds: () => Promise<void>;
};

export interface BreedsDetails {
  message: { [key: string]: string[] };
  status: string;
}

export const useBreeds = (): UseBreeds => {
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [errorBreeds, setErrorBreeds] = useState<unknown>();
  const [breeds, setBreeds] = useState<string[]>([]);

  const loadBreeds = async () => {
    setLoadingBreeds(true);

    const getBreeds = async () => {
      const addressToFetchAllBreeds = `${process.env.NEXT_PUBLIC_DOG_API}breeds/list/all`;
      const response = await fetch(addressToFetchAllBreeds);

      if (response.status !== 200) {
        throw new Error('Download error');
      }

      const fetchedBreeds = (await response.json()) as BreedsDetails;

      const concatenateBreedsSubBreeds = () => {
        return Object.entries(fetchedBreeds.message)
          .map((breed) => {
            if (breed[1].length > 0) {
              const subBreedsArray = breed[1].map((subBreed) => {
                return `${breed[0]}/${subBreed}`;
              });
              return [...subBreedsArray];
            }
            return breed[0];
          })
          .flatMap((breed) => breed);
      };

      const breedsWithSubBreeds = concatenateBreedsSubBreeds();
      return breedsWithSubBreeds;
    };

    try {
      const breeds = await getBreeds();
      setBreeds(breeds);
    } catch (error) {
      console.error(error);
      setErrorBreeds(error);
    } finally {
      setLoadingBreeds(false);
    }
  };

  useEffect(() => {
    loadBreeds();
  }, []);

  return { loadingBreeds, errorBreeds, loadBreeds, breeds };
};
