import Header from "../Header/header";
import Start from "../../components/Start/start";
import "./mainPage.css";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";

function MainPage() {

  const {
    clickedMusic,
    handleAudioValue,
    isPlay,
    audioRef,
    musics
  } = useContext(MyContext);

  return (
    <div className="container_manager_main_page">
      <ManagerShowPage />
      <Audio
        clickedMusic={musics.length > 0 && musics[clickedMusic]}
        handleAudioValue={handleAudioValue}
        isPlay={isPlay}
        audioRef={audioRef}
      />
      <Start />
      <Header />
    </div>
  );
}
export default MainPage;
