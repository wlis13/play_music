import returnIcon from "./image/arrow_for_down_white.png";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";
import Play from "./Play";
import "./playMusic.css";

function PlayMusic() {

  const {
    clickedMusic,
    setClickedMusic,
    musics,
    audioRef,
    currentTime,
    totalTime,
    startPlayBack,
    showPlay
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
      if (startPlayBack) {
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
    }
  }, [
    callJump,
    clickedMusic,
    currentTime,
    musics.length,
    setClickedMusic,
    startPlayBack,
    totalTime
  ]);

  return (
    <div className={`container_manager_play_music ${showPlay !== "reproduction" ? "not_show" : ""}`}>
      {
        musics.length > 0 ?
          <Play
            returnIcon={returnIcon}
            clickedMusic={musics[clickedMusic]}
            showTimeMusic={showTimeMusic}
          />
          : <ShowLoad />
      }
    </div>
  );
}


export default PlayMusic;
