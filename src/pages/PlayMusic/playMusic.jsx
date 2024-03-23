import returnIcon from "./image/arrow_for_down_white.png";
import { useContext, useEffect } from "react";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";
import Play from "./Play";
import "./playMusic.css";

function PlayMusic() {

  const {
    musics,
    currentTime,
    totalTime,
    showPlay,
    handleInputValue,
    isLike,
    returnListFiltered
  } = useContext(MyContext);

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
    const inputRange = document.getElementById("input_range");
    const percentValue = (currentTime / totalTime) * 100;
    const rangeWidth = inputRange.getBoundingClientRect().width;
    const thumbOffset = (percentValue / 100) * rangeWidth;

    inputRange.style.setProperty('--length-range', `${thumbOffset}px`);
  }, [currentTime, totalTime])

  return (
    <div className={`container_manager_play_music ${showPlay !== "reproduction" ? "not_show" : ""}`}>
      {
        musics.length > 0 ?
          <Play
            returnIcon={returnIcon}
            clickedMusic={returnListFiltered()}
            showTimeMusic={showTimeMusic}
            isLike={isLike}
          />
          : <ShowLoad />
      }
    </div>
  );
}


export default PlayMusic;
