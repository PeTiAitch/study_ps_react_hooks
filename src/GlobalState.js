import React from "react";
import useSpeakerDataManager from "./useSpeakerDataManager";

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const {
    speakerList,
    isLoading,
    toggleSpeakerFavorite,
    favoriteClickCount,
    incrementFavoriteClickCount,
  } = useSpeakerDataManager();

  const provider = {
    isLoading,
    speakerList,
    toggleSpeakerFavorite,
    favoriteClickCount,
    incrementFavoriteClickCount,
  };

  return (
    <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>
  );
};
