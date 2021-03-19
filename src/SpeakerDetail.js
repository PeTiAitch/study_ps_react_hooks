import React from "react";
import ImageToggleOnMouseOver from "./ImageToggleOnScroll";
import useSpeakerDataManager from "./useSpeakerDataManager";

const SpeakerDetail = React.memo(({ speakerRec, onHeartFavoriteHandler }) => {
  const { id, firstName, lastName, favorite, bio } = speakerRec;
  const {
    favoriteClickCount,
    incrementFavoriteClickCount,
  } = useSpeakerDataManager();
  console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);

  return (
    <div className="card col-4 cardmin">
      <ImageToggleOnMouseOver
        className="card-img-top"
        primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
        alt="{firstName} {lastName}"
      />
      <div className="card-body">
        <h4 className="card-title">
          <button
            className={favorite ? "heartredbutton" : "heartdarkbutton"}
            onClick={(e) => {
              onHeartFavoriteHandler(e, speakerRec);
              incrementFavoriteClickCount();
            }}
          />
          <span>
            {firstName} {lastName}
          </span>
          <h5>{favoriteClickCount}</h5>
        </h4>

        <span>{bio}</span>
      </div>
    </div>
  );
});

export default SpeakerDetail;
