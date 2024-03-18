import { useEffect, useRef, useState } from "react";
import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const [musics, setMusics] = useState([]);
  const [clickedMusic, setClickedMusic] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [filteredPageLike, setFilteredPageLike] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showPlay, setShowPlay] = useState("main_page");
  const [startPlayBack, setStartPlayBack] = useState(false);

  async function fetchMusics() {
    const url = "https://playmusicservice.vercel.app/all_musics";
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const response = await promise.json();
    setMusics(response);
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
    handleInputValue
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
