import pause from "./images/play.png";
import notLike from "./images/not_like.png";
import like from "./images/like.png";
import next from "./images/next.png";
import prev from "./images/prev.png";
import play from "./images/pause.png";
import playback from "./images/playback_thirth.png";
import playbackInit from "./images/playback_thirth_greem.png";
import "./start.css";
import { useContext } from "react";
import MyContext from "../../context/context";

function Start() {

  const {
    isPlay,
    musics,
    clickedMusic,
    setIsPlay,
    setClickedMusic,
    showPlay,
  } = useContext(MyContext);
  const playBack = localStorage.getItem("playback");

  const storageLikeList = localStorage.getItem("listLike") || [];
  const verifyLike = musics.length > 0 && storageLikeList.includes(musics[clickedMusic]._id)

  const listIcons = [
    { name: "handleLike", default: verifyLike ? like : notLike },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
    { name: "playback", default: playBack === "true" ? playbackInit : playback },
  ];

  function handlePlayAudio() {
    const audio = document.getElementById("audio");

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function handlePlay() {
    setIsPlay(true)
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

  function handleUpdateLike() {
    let list = JSON.parse(localStorage.getItem("listLike")) || [];
    const ID = musics[clickedMusic]._id;

    if (!list.includes(ID)) {
      list.push(ID);
      localStorage.setItem("listLike", JSON.stringify(list));
    } else {
      list = list.filter(id => id !== ID);
      localStorage.setItem("listLike", JSON.stringify(list));
    }
  }

  function initPlayBack() {
    const newPlayBack = playBack === "true" ? false : true
    localStorage.setItem("playback", newPlayBack);
  }

  function handleEvents({ target }) {
    const { alt } = target;
    if (alt === "playEndpause") {
      handlePlay()
    } else if (alt === "next" || alt === "prev") {
      handleNextAndPrev(alt);
      setIsPlay(true)
    } else if (alt === "handleLike") {
      handleUpdateLike();
    } else if (alt === "playback") {
      initPlayBack();
    }
  }

  function animationTitle() {
    let root = document.documentElement;
    const title = document.getElementById("title_menu_main_page");
    if (title) {
      const lengthTitle = (-title.getBoundingClientRect().width - 50) + "px";
      root.style.setProperty("--length-title", lengthTitle);
    }
  }

  animationTitle();


  return (
    <div className="menu_play_main_page">
      {
        showPlay === "reproduction" ?
          <div className="container_menu_reproduction">
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
          :
          <div className="container_menu_main_page">
            <div id="container_title_main_page">
              <p id="title_menu_main_page">{musics.length > 0 && musics[clickedMusic].title}</p>
            </div>
            {
              listIcons.filter((item) => musics.length > 0 &&
                item.name !== "prev" && item.name !== "playback"
              )
                .map((icon) => (
                  <img
                    src={icon.default}
                    alt={icon.name}
                    key={icon.name}
                    onClick={handleEvents}
                  />
                ))
            }
          </div>
      }
    </div>
  );
}
export default Start;
