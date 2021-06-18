import React, { createContext, useContext, useState, FC } from "react";
import { dogBreeds } from "../data/dogbreeds";

const initDogBreeds = dogBreeds.map((dog) => {
  return { name: dog, checked: true };
});

export type DogDetails = {
  message: string;
  status: string;
}[];

export interface AppSharedState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  dogs: DogDetails[];
  setDogs: (dogs: DogDetails[]) => void;
  likedDogs: DogDetails[];
  setLikedDogs: (dogs: DogDetails[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  breed: string;
  setBreed: (breed: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  apiCallCounter: number;
  setApiCallCounter: (apiCallCounter: number) => void;
  isSelectAll: boolean;
  setIsSelectAll: (isSelectAll: boolean) => void;
  dogsAPI: string;
  dogBreedsContainer: { name: string; checked: boolean }[];
  setDogBreedsContainer: (
    dogBreedsContainer: {
      name: string;
      checked: boolean;
    }[]
  ) => void;
}

const AppContext = createContext<AppSharedState>({} as AppSharedState);

const AppSharedState = () => {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState([] as DogDetails[]);
  const [likedDogs, setLikedDogs] = useState([] as DogDetails[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [breed, setBreed] = useState("");
  const [error, setError] = useState(false);
  const [apiCallCounter, setApiCallCounter] = useState(0);
  const [isSelectAll, setIsSelectAll] = useState(true);
  const [dogBreedsContainer, setDogBreedsContainer] = useState(initDogBreeds);
  const dogsAPI = `https://dog.ceo/api/breed/${breed}/images/random`;

  return {
    loading,
    setLoading,
    dogs,
    setDogs,
    likedDogs,
    setLikedDogs,
    isModalOpen,
    setIsModalOpen,
    breed,
    setBreed,
    error,
    setError,
    apiCallCounter,
    setApiCallCounter,
    isSelectAll,
    setIsSelectAll,
    dogBreedsContainer,
    setDogBreedsContainer,
    dogsAPI,
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
