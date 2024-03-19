import Header from "../Header/header";
import Start from "../../components/Start/start";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";
import "./mainPage.css";
import Audio from "../../components/Audio/audio";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../context/context";

function MainPage() {

  const {
    audioRef,
    isPlay,
    clickedMusic,
    handleAudioValue,
    musics,
    showPlay,
    storageLikeList,
  } = useContext(MyContext);

  const [likeMusic, setLikeMusic] = useState([]);
  const nowLike = showPlay === "list_like";

  useEffect(() => {
    if (nowLike) {
      setLikeMusic(musics.filter((music) => storageLikeList.includes(music._id)));
    }
  }, [musics, nowLike, showPlay, storageLikeList])

  return (
    <div className="container_manager_main_page">
      <ManagerShowPage />
      <Start />
      <Header />
      <Audio
        audioRef={audioRef}
        isPlay={isPlay}
        clickedMusic={nowLike ? likeMusic[clickedMusic] : musics && musics[clickedMusic]}
        handleAudioValue={handleAudioValue}
      />
    </div>
  );
}
export default MainPage;
