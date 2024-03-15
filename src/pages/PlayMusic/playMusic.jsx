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

function PlayMusic() {

  const { clickedMusic, musics } = useContext(MyContext);
  const audioRef = useRef(null);

  const [isPlay, setIsPlay] = useState(false);
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
      } else {
        setMusicIndex(0)
      }
    } else if (alt === "prev") {
      setPlayList(true);
      if (handleIndexPrev(musicIndex)) {
        setMusicIndex(musicIndex - 1)
      } else {
        setMusicIndex(musics.length - 1)
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
    const { duration } = target;
    setCurrentTime(audioRef.current.currentTime);
    setTotalTime(duration);
  }

  function handleTimeChange({ target }) {
    const { value } = target;
    setCurrentTime(value);
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
          max={totalTime}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <p>{formatterTime(Math.floor(totalTime))}</p>
      </div>
    )
  }

  useEffect(() => {
    const audio = document.getElementById("audio");
    if (audio) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      if (currentTime === totalTime) {
        if (musicIndex < musics.length - 1) {
          setMusicIndex(musicIndex + 1);
          audio.play()
        } else {
          setMusicIndex(0);
          audio.play()
        }
      }
    }
  }, [currentTime, isPlay, musicIndex, musics.length, totalTime])

  return (
    <div className="container_manager_play_music">
      {
        Object.keys(clickedMusic).length > 0 && playList === false ?
          <div className="container_object_music">
            <header className="container_header_play_music">
              <img src={returnIcon} alt="voltar para a página anterior" />
              <p>{(musics[musicIndex].description).substring(0, 30)}</p>
              <img src={spotyfree} alt="spoty free" />
            </header>
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
          musics.length > 0 ?
            <div className="container_object_music">
              <header className="container_header_play_music">
                <img src={returnIcon} alt="voltar para a página anterior" />
                <p>{
                  (musics[musicIndex].description).substring(0, 30)
                }</p>
                <img src={spotyfree} alt="spoty free" />
              </header>
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
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
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
        <h1>@</h1>
      </div>
    </div>
  );
}
export default PlayMusic;
