import pause from "./images/play.png";
import notLike from "./images/not_like.png";
import like from "./images/like.png";
import next from "./images/next.png";
import prev from "./images/prev.png";
import play from "./images/pause.png";
import spotyfree from "./images/spotyfree_logo.png";
import "./start.css";
import { useContext, useRef } from "react";
import MyContext from "../../context/context";

function Start() {

  const { isPlay, musics, clickedMusic, setIsPlay,
    fetchUpdateLike, setClickedMusic } = useContext(MyContext);

  const addLike = useRef(musics.lenght > 0 && musics[clickedMusic].like);

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

  function handleUpdateLike(music, liked) {
    const updatedLike = { ...music, like: liked }
    fetchUpdateLike(updatedLike);
  }

  function handleEvents({ target }) {
    const { alt } = target;
    if (alt === "playEndpause") {
      handlePlay()
    } else if (alt === "next" || alt === "prev") {
      handleNextAndPrev(alt);
      setIsPlay(true)
    } else if (alt === "like" || alt === "notLike") {
      addLike.current = !addLike.current;
      handleUpdateLike(musics.lenght > 0 && musics[clickedMusic], addLike.current);
    }
  }

  const listIcons = [
    { name: "notLike", default: notLike },
    { name: "like", default: like },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
    { name: "spotyfree", default: spotyfree },
  ];

  return (
    <div className="container_menu_play">
      {
        listIcons.filter((item) => musics.lenght > 0 && musics[clickedMusic].like ? item.name !== "notLike" : item.name !== "like").map((icon) => (
          <img
            src={icon.default}
            alt={icon.name}
            key={icon.name}
            onClick={handleEvents}
          />
        ))
      }
    </div>
  );
}
export default Start;
