import Start from "../../components/Start/start";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";
import Menu from "../Menu/menu";
import "./mainPage.css";

function MainPage() {

  const {
    audioRef,
    isPlay,
    clickedMusic,
    handleAudioValue,
    musics,
    likeMusic,
    showPlay,
    isLike
  } = useContext(MyContext);

  const nowLike = showPlay === "list_like";

  return (
    <div className="container_manager_main_page">
      <div className="container_show_page_and_start">
        <ManagerShowPage />
        <Start />
      </div>
      <Menu />
      <Audio
        audioRef={audioRef}
        isPlay={isPlay}
        clickedMusic={nowLike || isLike ? likeMusic[clickedMusic]
          : musics.length > 0 && musics[clickedMusic]}
        handleAudioValue={handleAudioValue}
      />
    </div>
  );
}
export default MainPage;
