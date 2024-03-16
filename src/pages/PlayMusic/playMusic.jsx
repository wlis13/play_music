import "./playMusic.css";
import spotyfree from "./image/spotyfree_logo.png";
import returnIcon from "./image/arrow_for_down_white.png";
import pause from "./image/play.png";
import like from "./image/not_like.png";
import next from "./image/next.png";
import prev from "./image/prev.png";
import play from "./image/pause.png";
import { useContext, useEffect, useRef, useState } from "react";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";
import Play from "./Play";

function PlayMusic() {

  const {
    clickedMusic,
    setClickedMusic,
    musics,
    isPlay,
    setIsPlay
  } = useContext(MyContext);
  const audioRef = useRef(null);

  const listIcons = [
    { name: "like", default: like },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
    { name: "spotyfree", default: spotyfree },
  ];

  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [callJump, setCallJump] = useState(1);

  function handlePlayAudio() {
    const audio = document.getElementById("audio");

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause()
    }
  }

  function handlePlay() {
    setIsPlay(prev => !prev);
    handlePlayAudio()
  }

  function handleIndexNext(index) {
    if (index < musics.length - 1) {
      return true;
    } else {
      return false;
    }
  }

  function handleIndexPrev(index) {
    if (index > 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleNextAndPrev(alt) {
    if (alt === "next") {
      if (handleIndexNext(clickedMusic)) {
        setClickedMusic(clickedMusic + 1)
      } else {
        setClickedMusic(0)
      }
    } else if (alt === "prev") {
      if (handleIndexPrev(clickedMusic)) {
        setClickedMusic(clickedMusic - 1)
      } else {
        setClickedMusic(musics.length - 1)
      }
    }
  }

  function handleEvents({ target }) {
    const { alt } = target;
    if (alt === "playEndpause") {
      handlePlay()
    } else if (alt === "next" || alt === "prev") {
      handleNextAndPrev(alt);
      setIsPlay(true)
    }
  }

  function handleInputValue({ target }) {
    const { value } = target;
    audioRef.current.currentTime = value;
  }

  function handleAudioValue({ target }) {
    const { duration, currentTime } = target;
    setTotalTime(duration);
    setCurrentTime(currentTime);
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
    <div className="container_manager_play_music">
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
      <div className="container_menu_play">
        {
          listIcons.map((icon) => (
            <img
              src={icon.default}
              alt={icon.name}
              key={icon.name}
              onClick={handleEvents}
            />
          ))
        }
      </div>
    </div>
  );
}

export default PlayMusic;
