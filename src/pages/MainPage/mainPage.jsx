import Start from "../../components/Start/start";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";
import Audio from "../../components/Audio/audio";
import { useContext } from "react";
import MyContext from "../../context/context";
import Menu from "../Menu/menu";
import "./mainPage.css";
import ShowLoad from "../../components/ShowLoad/showLoad";

function MainPage() {

  const {
    audioRef,
    isPlay,
    handleAudioValue,
    returnListFiltered,
    musics
  } = useContext(MyContext);

  return (
    <div className="container_manager_main_page">
      {
        musics.length > 0 ?
          <div>
            <div className="container_show_page_and_start">
              <ManagerShowPage />
              <Start />
            </div>
            <Menu />
            <Audio
              audioRef={audioRef}
              isPlay={isPlay}
              clickedMusic={returnListFiltered()}
              handleAudioValue={handleAudioValue}
            />
          </div>
          : <ShowLoad />
      }
    </div>
  );
}
export default MainPage;
