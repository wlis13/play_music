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
    storageLikeList,
    likeMusic,
    isLike
  } = useContext(MyContext);

  const playBack = localStorage.getItem("playback");
  const audio = document.getElementById("audio");

  const verifyLikeStorage = showPlay === "list_like" || isLike && likeMusic.length > 0 && storageLikeList.includes(likeMusic[clickedMusic]._id);

  const verifyLike = musics.length > 0 && storageLikeList.includes(musics[clickedMusic]._id)

  const listIcons = [
    { name: "handleLike", default: verifyLikeStorage || verifyLike ? like : notLike },
    { name: "prev", default: prev },
    { name: "playEndpause", default: isPlay ? play : pause },
    { name: "next", default: next },
    { name: "playback", default: playBack === "true" ? playbackInit : playback },
  ];

  function handlePlayAudio() {
    const audio = document.getElementById("audio");
    if (audio.paused) {
      setIsPlay(true);
      audio.play();
    } else {
      setIsPlay(false);
      audio.pause();
    }
  }

  function handlePlay() {
    setIsPlay(true)
    handlePlayAudio()
  }

  function handleIndexNext(index) {
    if (showPlay === "list_like" || isLike) {
      if (index < likeMusic.length - 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (index < musics.length - 1) {
        return true;
      } else {
        return false;
      }
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
        setClickedMusic(clickedMusic + 1);
        audio.load() && audio.play();
      } else {
        setClickedMusic(0);
        audio.load() && audio.play();
      }
    } else if (alt === "prev") {
      if (handleIndexPrev(clickedMusic)) {
        setClickedMusic(clickedMusic - 1);
        audio.load() && audio.play();
      } else {
        if (showPlay === "list_like" || isLike) {
          setClickedMusic(likeMusic.length - 1);
          audio.load() && audio.play();
        } else {
          setClickedMusic(musics.length - 1);
          audio.load() && audio.play();
        }
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

  function returnTitle() {
    if (showPlay === "list_like" || isLike) {
      if (likeMusic.length > 0) {
        return (
          likeMusic[clickedMusic].title
        )
      }
    } else {
      if (musics.length > 0) {
        return (
          musics[clickedMusic].title
        )
      }
    }
  }

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
              <span id="title_menu_main_page">{returnTitle()}</span>
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
