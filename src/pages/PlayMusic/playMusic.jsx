import spotyfree from "./image/spotyfree_logo.png";
import returnIcon from "./image/arrow_for_down_white.png";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";
import Play from "./Play";
import PropType from "prop-types";
import "./playMusic.css";

function PlayMusic({ showPlay }) {

  const {
    clickedMusic,
    setClickedMusic,
    musics,
    isPlay,
    audioRef,
    handleAudioValue,
    currentTime,
    totalTime,
  } = useContext(MyContext);

  const [callJump, setCallJump] = useState(1);

  function handleInputValue({ target }) {
    const { value } = target;
    audioRef.current.currentTime = value;
  }

  function formatterTime(time_seconds) {
    let minutes = Math.floor(time_seconds / 60);
    let seconds = Math.floor(time_seconds % 60);
    if (time_seconds) {
      const formattedTime = `${minutes}:${seconds < 10 ? "0" : ''}${seconds}`;
      return formattedTime;
    } else {
      return "0:00"
    }
  }

  function showTimeMusic() {
    return (
      <div className="container_time_music">
        <p>{formatterTime(Math.floor(currentTime))}</p>
        <input
          id="input_range"
          type="range"
          min={0}
          max={totalTime && totalTime}
          value={currentTime}
          onChange={handleInputValue}
        />
        <p>{formatterTime(Math.floor(totalTime))}</p>
      </div>
    )
  }

  useEffect(() => {
    const audio = document.getElementById("audio");
    if (audio) {
      if (totalTime > 0) {
        if (currentTime === totalTime) {
          if (callJump === 1000) {
            setCallJump(1);
          }
          setCallJump(callJump + 1);
          if (callJump % 2 !== 0) {
            if (clickedMusic < musics.length - 1) {
              setClickedMusic(clickedMusic + 1);
              audio.play();
            } else {
              setClickedMusic(0)
              audio.play();
            }
          }
        }
      }
    }
  }, [callJump, clickedMusic, currentTime, musics.length, setClickedMusic, totalTime]);

  return (
    <div className={`container_manager_play_music ${!showPlay ? "not_show" : ""}`}>
      {
        musics.length > 0 ?
          <Play
            returnIcon={returnIcon}
            spotyfree={spotyfree}
            clickedMusic={musics[clickedMusic]}
            handleAudioValue={handleAudioValue}
            showTimeMusic={showTimeMusic}
            isPlay={isPlay}
            audioRef={audioRef}
          />
          : <ShowLoad />
      }
    </div>
  );
}

PlayMusic.propTypes = {
  showPlay: PropType.bool.isRequired,
}

export default PlayMusic;
