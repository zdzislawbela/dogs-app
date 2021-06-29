import React, { createContext, useContext, useState, FC } from "react";
import { Breed, breedsData } from "../data/breedsData";
import { useDogs } from "../hooks/useDogs";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type DogDetails = {
  status: string;
  image: string;
  breedName: Breed;
  downloadedAt: number;
};

export type DogsDetails = DogDetails[];

export type likedDogsDetails = {
  image: string;
  breed: string;
}[];

export type modalDetails = { image: string; breed: string } | null;

export interface AppSharedState {
  isMosaic: boolean;
  setIsMosaic: (isMosaic: boolean) => void;

  likedDogs: likedDogsDetails;
  setLikedDogs: (likedDogs: likedDogsDetails) => void;

  storagedBreeds: string[];
  setStoragedBreeds: (breeds: string[]) => void;

  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;

  isSelectAll: boolean;
  setIsSelectAll: (isSelectAll: boolean) => void;

  dogs: DogDetails[];
  loading: boolean;
  error?: Error;
  loadMore: (howMany?: number, setEmpty?: boolean) => Promise<void>;
  setEmpty: () => void;
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
  const [isMosaic, setIsMosaic] = useState(false);
  const [modalDetails, setModalDetails] = useState<modalDetails>(null);
  const [isSelectAll, setIsSelectAll] = useState(true);

  const { loading, error, dogs, loadMore, setEmpty } = useDogs();

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

  return {
    isMosaic,
    setIsMosaic,

    modalDetails,
    setModalDetails,

    likedDogs,
    setLikedDogs,

    storagedBreeds,
    setStoragedBreeds,

    isSelectAll,
    setIsSelectAll,

    loading,
    error,
    dogs,
    loadMore,
    setEmpty,
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
