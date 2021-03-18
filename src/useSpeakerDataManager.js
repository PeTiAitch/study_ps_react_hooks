import { useEffect, useReducer } from "react";
import SpeakerData from "./SpeakerData";
import speakersReducer from "./speakersReducer";
import axios from "axios";

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
  });

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
    // new Promise(function (resolve) {
    //   setTimeout(function () {
    //     resolve();
    //   }, 1000);
    // }).then(() => {
    //   dispatch({
    //     type: "setSpeakerList",
    //     data: SpeakerData,
    //   });
    // });
    return () => {
      console.log("cleanup");
    };
  }, []);

  return { isLoading, speakerList, toggleSpeakerFavorite };
};

export default useSpeakerDataManager;
