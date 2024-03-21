import { useEffect, useRef, useState } from "react";
import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const [musics, setMusics] = useState([]);
  const [clickedMusic, setClickedMusic] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [filteredPageLike, setFilteredPageLike] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showPlay, setShowPlay] = useState("main_page");
  const [startPlayBack, setStartPlayBack] = useState(false);
  const [callJump, setCallJump] = useState(1);
  const [likeMusic, setLikeMusic] = useState([]);
  const [paginationControl, setPaginationControl] = useState({
    init: 0,
    end: 8,
    count: 1
  });

  const playBack = localStorage.getItem("playback");
  const storageLikeList = localStorage.getItem("listLike") || [];

  async function fetchMusics() {
    const url = "https://playmusicservice.vercel.app/all_musics";
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const response = await promise.json();
    setTimeout(() => {
      setMusics(response);
    }, 2000);
  }

  async function fetchUpdateLike(music) {
    const urlUpdate = "https://playmusicservice.vercel.app/update_music";
    await fetch(urlUpdate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(music),
    });
    fetchMusics();
  }

  function handleAudioValue({ target }) {
    const { duration, currentTime } = target;
    setTotalTime(duration);
    setCurrentTime(currentTime);
    return currentTime;
  }

  function handleInputValue({ target }) {
    const { value } = target;
    audioRef.current.currentTime = value;
  }

  useEffect(() => {
    fetchMusics()
  }, [])

  useEffect(() => {
    const audio = document.getElementById("audio");
    if (audio) {
      if (playBack === "true") {
        if (totalTime > 0) {
          if (currentTime === totalTime) {
            if (callJump === 1000) {
              setCallJump(1);
            }
            setCallJump(callJump + 1);
            if (callJump % 2 !== 0) {
              if (showPlay === "list_like" || isLike) {
                if (clickedMusic < likeMusic.length - 1) {
                  setClickedMusic(clickedMusic + 1);
                  audio.load() && audio.play();

                } else {
                  setClickedMusic(0)
                  audio.load() && audio.play();
                }
              } else {
                if (clickedMusic < musics.length - 1) {
                  setClickedMusic(clickedMusic + 1);
                  audio.load() && audio.play();
                } else {
                  setClickedMusic(0)
                  audio.load() && audio.play();
                }
              }
            }
          }
        }
      }
    }
  }, [callJump, clickedMusic, currentTime, isLike, likeMusic.length, musics.length, playBack, setClickedMusic, showPlay, totalTime]);

  const providerValue = {
    fetchMusics,
    musics,
    clickedMusic,
    setClickedMusic,
    isPlay,
    setIsPlay,
    filteredPageLike,
    setFilteredPageLike,
    fetchUpdateLike,
    isLike,
    setIsLike,
    audioRef,
    currentTime,
    totalTime,
    handleAudioValue,
    showPlay,
    setShowPlay,
    startPlayBack,
    setStartPlayBack,
    handleInputValue,
    storageLikeList,
    likeMusic,
    setLikeMusic,
    paginationControl,
    setPaginationControl
  }

  return (
    <MyContext.Provider value={providerValue}>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider;
