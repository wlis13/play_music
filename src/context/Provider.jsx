import { useEffect, useRef, useState } from "react";
import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const [musics, setMusics] = useState([]);
  const [matrixMusic, setMatrixMusic] = useState();
  const [clickedMusic, setClickedMusic] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [filteredPageLike, setFilteredPageLike] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
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
  const filteredCategory = JSON.parse(localStorage.getItem("listCategoryMusic"));

  function matrixToList(matrix) {
    const list = [];
    matrix.forEach((item) => {
      item.forEach((i) => {
        list.push(i);
      })
    })

    return list;
  }

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
      const groups = [];
      for (let index = 0; index < response.length; index += 6) {
        groups.push(response.slice(index, index + 6))
      }
      setMatrixMusic(groups)
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
    function continuePlay(list, audio) {
      if (clickedMusic < list.length - 1) {
        setClickedMusic(clickedMusic + 1);
        audio.load() && audio.play();
      } else {
        setClickedMusic(0)
        audio.load() && audio.play();
      }
    }

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
                continuePlay(likeMusic, audio);
              } else if (isCategory) {
                continuePlay(matrixToList(filteredCategory), audio);
              } else {
                continuePlay(musics, audio);
              }
            }
          }
        }
      }
    }
  }, [callJump, clickedMusic, currentTime, filteredCategory, isCategory, isLike, likeMusic, likeMusic.length, musics, musics.length, playBack, setClickedMusic, showPlay, totalTime]);

  function returnListFiltered() {
    const nowLike = showPlay === "list_like";
    if (nowLike || isLike) {
      return likeMusic[clickedMusic];
    } else if (isCategory) {
      return matrixToList(filteredCategory)[clickedMusic]
    } else {
      if (musics.length > 0) {
        return musics[clickedMusic]
      }
    }
  }

  const providerValue = {
    fetchMusics,
    musics,
    matrixMusic,
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
    setPaginationControl,
    filteredCategory,
    returnListFiltered,
    isCategory,
    setIsCategory,
    matrixToList
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
