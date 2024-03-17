import Header from "../Header/header";
import ListMusic from "../../components/ListMusic/listMusic";
import "./mainPage.css";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";
import Start from "../../components/Start/start";

function MainPage() {

  const {
    isPlay,
    audioRef,
    clickedMusic,
    handleAudioValue,
    musics,
  } = useContext(MyContext);

  return (
    <div className="container_manager_main_page">
      <ListMusic />
      <Start />
      <Header />
      <Audio
        clickedMusic={musics.length > 0 && musics[clickedMusic]}
        handleAudioValue={handleAudioValue}
        isPlay={isPlay}
        audioRef={audioRef}
      />
    </div>
  );
}
export default MainPage;
