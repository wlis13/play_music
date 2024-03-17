import { useEffect, useState } from "react";
import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const [musics, setMusics] = useState([]);
  const [clickedMusic, setClickedMusic] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const [pageLike, setPageLike] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [saveTimeMusic, setSaveTimeMusic] = useState(0);
  const [currentPath, setCurrentPath] = useState("");
  const [audio, setAudio] = useState();

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
    pageLike,
    setPageLike,
    fetchUpdateLike,
    isLike,
    setIsLike,
    saveTimeMusic,
    setSaveTimeMusic,
    currentPath,
    setCurrentPath,
    audio,
    setAudio
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
