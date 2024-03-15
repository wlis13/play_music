import "./playMusic.css";
import pause from "./image/play.png";
import like from "./image/not_like.png";
import next from "./image/next.png";
import prev from "./image/prev.png";
import play from "./image/pause.png";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";

function PlayMusic() {

  const { clickedMusic, musics } = useContext(MyContext);

  const [isPlay, setIsPlay] = useState(true);
  const listIcons = [
    { name: "like", default: like },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
  ];

  const [musicIndex, setMusicIndex] = useState(0);
  const [playList, setPlayList] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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
      setPlayList(true);
      if (handleIndexNext(musicIndex)) {
        setMusicIndex(musicIndex + 1)
      }
    } else if (alt === "prev") {
      setPlayList(true);
      if (handleIndexPrev(musicIndex)) {
        setMusicIndex(musicIndex - 1)
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

  function handleTimeUpdate({ target }) {
    const { currentTime, duration } = target;
    setCurrentTime(currentTime);
    setTotalTime(duration);
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
          max={totalTime}
          value={currentTime}
          onChange={(event) => { setCurrentTime(event.target.value) }}
        />
        <p>{formatterTime(Math.floor(totalTime))}</p>
      </div>
    )
  }

  useEffect(() => {
    const audio = document.getElementById("audio");
    if (isPlay) {
      audio.play();
    } else {
      audio.pause()
    }
  }, [isPlay])

  return (
    <div className="container_manager_play_music">
      {
        Object.keys(clickedMusic).length > 0 && playList === false ?
          <div className="container_object_music">
            <img
              id="image_play_music"
              src={clickedMusic.image}
              alt={clickedMusic.title}
            />
            {showTimeMusic()}
            <h2>{clickedMusic.title}</h2>
            <audio
              autoPlay={isPlay}
              id="audio"
              src={clickedMusic.music}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          :
          <div className="container_object_music">
            <img
              id="image_play_music"
              src={musics[musicIndex].image}
              alt={musics[musicIndex].title}
            />
            {showTimeMusic()}
            <h2>{musics[musicIndex].title}</h2>
            <audio
              autoPlay={isPlay}
              id="audio"
              src={musics[musicIndex].music}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
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
        <h1>@</h1>
      </div>
    </div>
  );
}
export default PlayMusic;
