import { useEffect, useReducer } from "react";
import speakersReducer from "./speakersReducer";
import axios from "axios";

const useSpeakerDataManager = () => {
  const [
    { isLoading, speakerList, favoriteClickCount, hasErrored, error },
    dispatch,
  ] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasErrored: false,
    error: null,
  });

  function incrementFavoriteClickCount() {
    dispatch({
      type: "incrementFavoriteClickCount",
    });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async () => {
      await axios.put(
        `http://localhost:8001/speakers/${speakerRec.id}`,
        speakerRec
      );
      dispatch({
        type: speakerRec.favorite ? "unfavorite" : "favorite",
        id: speakerRec.id,
      });
    };
    updateData();
  }

  useEffect(() => {
    const fetchData = async function () {
      try {
        let result = await axios.get("http://localhost:8001/speakers"); //8001 todo
        dispatch({ type: "setSpeakerList", data: result.data });
      } catch (e) {
        dispatch({ type: "errored", error: e });
      }
    };
    fetchData();

    return () => {
      console.log("cleanup");
    };
  }, []);

  return {
    isLoading,
    speakerList,
    toggleSpeakerFavorite,
    favoriteClickCount,
    incrementFavoriteClickCount,
    hasErrored,
    error,
  };
};

export default useSpeakerDataManager;
