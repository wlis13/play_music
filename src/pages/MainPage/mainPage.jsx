import Header from "../Header/header";
import ListMusic from "../../components/ListMusic/listMusic";
import "./mainPage.css";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";

function MainPage() {

  const {
    isPlay,
    audioRef,
    clickedMusic,
    handleAudioValue
  } = useContext(MyContext);

  return (
    <div className="container_manager_main_page">
      <ListMusic />
      <Header />
      <Audio
        clickedMusic={clickedMusic}
        handleAudioValue={handleAudioValue}
        isPlay={isPlay}
        audioRef={audioRef}
      />
    </div>
  );
}
export default MainPage;
