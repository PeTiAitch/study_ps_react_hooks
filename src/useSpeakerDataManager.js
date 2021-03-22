import { useEffect, useReducer } from "react";
import speakersReducer from "./speakersReducer";
import axios from "axios";

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList, favoriteClickCount }, dispatch] = useReducer(
    speakersReducer,
    {
      isLoading: true,
      speakerList: [],
      favoriteClickCount: 0,
    }
  );

  function incrementFavoriteClickCount() {
    dispatch({
      type: "incrementFavoriteClickCount",
    });
  }

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async () => {
      await axios.put(
        `http://localhost:8001/speakers/${speakerRec.id}`,
        JSON.stringify(speakerRec)
      );
      dispatch({
        type: speakerRec.favorite ? "unfavorite" : "favorite",
        id: speakerRec.id,
      });
    };
    updateData();
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8001/speakers"); //uses the forwarded port!!!!
      dispatch({
        type: "setSpeakerList",
        data: result.data,
      });
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
  };
};

export default useSpeakerDataManager;
