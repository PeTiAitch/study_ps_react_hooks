import { useEffect, useReducer } from "react";
import SpeakerData from "./SpeakerData";
import speakersReducer from "./speakersReducer";

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
  });

  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: "setSpeakerList",
        data: SpeakerData,
      });
    });
    return () => {
      console.log("cleanup");
    };
  }, []);

  return { isLoading, speakerList, dispatch };
};

export default useSpeakerDataManager;
