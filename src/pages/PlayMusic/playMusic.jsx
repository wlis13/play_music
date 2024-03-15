import "./playMusic.css";
import pause from "./image/play.png";
import like from "./image/not_like.png";
import next from "./image/next.png";
import prev from "./image/prev.png";
import play from "./image/pause.png";
import { useContext, useState } from "react";
import MyContext from "../../context/context";

function PlayMusic() {

  const { clickedMusic } = useContext(MyContext);

  const [isPlay, setIsPlay] = useState(false);

  const listIcons = [
    { name: "like", default: like },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
  ];

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

  function handleEvents({ target }) {
    const { alt } = target;
    if (alt === "playEndpause") {
      handlePlay()
    }
  }

  return (
    <div className="container_manager_play_music">
      {
        Object.keys(clickedMusic).length > 0 &&
        <div className="container_object_music">
          <img
            id="image_play_music"
            src={clickedMusic.image}
            alt={clickedMusic.title}
          />
          <h2>{clickedMusic.title}</h2>
          <audio id="audio" src={clickedMusic.music} />
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
