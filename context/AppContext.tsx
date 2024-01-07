import React, { createContext, useContext, useState, FC } from 'react';
import { useBreeds } from '../hooks/useBreeds';
import { useDogs } from '../hooks/useDogs';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type DogDetails = {
  status: string;
  image: string;
  breedName: string;
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
  isInfoModalVisible: boolean;
  setIsInfoModalVisible: (isInfoModalVisible: boolean) => void;
  likedDogs: likedDogsDetails;
  setLikedDogs: (likedDogs: likedDogsDetails) => void;
  storagedBreeds: string[];
  setStoragedBreeds: (breeds: string[]) => void;
  modalDetails: modalDetails;
  setModalDetails: (modalDetails: modalDetails) => void;
  isSelectAll: boolean;
  setIsSelectAll: (isSelectAll: boolean) => void;
  breeds: string[];
  loadingBreeds: boolean;
  errorBreeds?: unknown;
  loadBreeds: () => Promise<void>;
  dogs: DogDetails[];
  loading: boolean;
  error?: unknown;
  loadMore: (howMany?: number, setEmpty?: boolean) => Promise<void>;
  setEmpty: () => void;
}

const AppContext = createContext<AppSharedState>({} as AppSharedState);

const AppSharedState = () => {
  const { loadingBreeds, errorBreeds, loadBreeds, breeds } = useBreeds();
  const [isMosaic, setIsMosaic] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [modalDetails, setModalDetails] = useState<modalDetails>(null);
  const [isSelectAll, setIsSelectAll] = useState(true);

  const [storagedBreeds, setStoragedBreeds] = useLocalStorage<string[]>(
    'selectedBreeds',
    breeds
  );

  const [likedDogs, setLikedDogs] = useLocalStorage<likedDogsDetails>(
    'likedDogs',
    []
  );

  const { loading, error, dogs, loadMore, setEmpty } = useDogs();

  if (typeof window !== 'undefined') {
    const storagedBreedsExists = window.localStorage.getItem('selectedBreeds');
    if (!storagedBreedsExists) {
      setStoragedBreeds(breeds);
    }

    const likedDogsExists = window.localStorage.getItem('likedDogs');
    if (!likedDogsExists) {
      setLikedDogs([]);
    }
  }

  return {
    isMosaic,
    setIsMosaic,
    isInfoModalVisible,
    setIsInfoModalVisible,
    modalDetails,
    setModalDetails,
    likedDogs,
    setLikedDogs,
    storagedBreeds,
    setStoragedBreeds,
    isSelectAll,
    setIsSelectAll,
    loadingBreeds,
    errorBreeds,
    loadBreeds,
    breeds,
    loading,
    error,
    dogs,
    loadMore,
    setEmpty,
  };
};

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <AppContext.Provider value={AppSharedState()}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
