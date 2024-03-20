import Header from "../Header/header";
import Start from "../../components/Start/start";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";
import "./mainPage.css";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";

function MainPage() {

  const {
    audioRef,
    isPlay,
    clickedMusic,
    handleAudioValue,
    musics,
    likeMusic,
    showPlay
  } = useContext(MyContext);

  const nowLike = showPlay === "list_like";

  return (
    <div className="container_manager_main_page">
      <ManagerShowPage />
      <Start />
      <Header />
      <Audio
        audioRef={audioRef}
        isPlay={isPlay}
        clickedMusic={nowLike ? likeMusic[clickedMusic]
          : musics.length > 0 && musics[clickedMusic]}
        handleAudioValue={handleAudioValue}
      />
    </div>
  );
}
export default MainPage;
