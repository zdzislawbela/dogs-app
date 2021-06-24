import React, { createContext, useContext, useState, FC } from "react";
import { Breed, breedsData } from "../data/breedsData";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type DogDetails = {
  status: string;
  image: string;
  breedName: Breed;
  time: number;
};

export type DogsDetails = DogDetails[];

export type likedDogsDetails = {
  image: string;
  breed: string;
}[];

export interface AppSharedState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isError: string | boolean;
  setIsError: (isError: string | boolean) => void;

  fetchedDogs: DogsDetails;
  setFetchedDogs: (fetchedDogs: DogsDetails) => void;
  likedDogs: likedDogsDetails;
  setLikedDogs: (likedDogs: likedDogsDetails) => void;

  apiCallCounter: number;
  setApiCallCounter: (apiCallCounter: number) => void;

  isSelectAll: boolean;
  setIsSelectAll: (isSelectAll: boolean) => void;

  storagedBreeds: string[];
  setStoragedBreeds: (breeds: string[]) => void;
}

const AppContext = createContext<AppSharedState>({} as AppSharedState);

const AppSharedState = () => {
  const [storagedBreeds, setStoragedBreeds] = useLocalStorage<string[]>(
    "selectedBreeds",
    breedsData
  );

  const [likedDogs, setLikedDogs] = useLocalStorage<likedDogsDetails>(
    "likedDogs",
    []
  );

  if (typeof window !== "undefined") {
    const storagedBreedsExists = window.localStorage.getItem("selectedBreeds");
    if (!storagedBreedsExists) {
      setStoragedBreeds(breedsData);
    }

    const likedDogsExists = window.localStorage.getItem("likedDogs");
    if (!likedDogsExists) {
      setLikedDogs([]);
    }
  }

  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState<string | boolean>(false);
  const [fetchedDogs, setFetchedDogs] = useState<DogsDetails>([]);
  const [apiCallCounter, setApiCallCounter] = useState(0);
  const [isSelectAll, setIsSelectAll] = useState(true);

  return {
    loading,
    setLoading,
    isError,
    setIsError,
    fetchedDogs,
    setFetchedDogs,
    likedDogs,
    setLikedDogs,
    apiCallCounter,
    setApiCallCounter,
    isSelectAll,
    setIsSelectAll,
    storagedBreeds,
    setStoragedBreeds,
  };
};

export const AppWrapper: FC = ({ children }) => {
  return (
    <AppContext.Provider value={AppSharedState()}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
