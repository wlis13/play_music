import PropTypes from "prop-types";
import { useContext } from "react";
import MyContext from "../../context/context";
import Audio from "../../components/Audio/audio";

function Play({
  returnIcon,
  clickedMusic,
  handleAudioValue,
  showTimeMusic,
  isPlay,
  audioRef,
}) {

  const { setFilteredPageLike, setShowPlay } = useContext(MyContext);

  function handleGoBack() {
    setShowPlay("main_page")
    setFilteredPageLike(false);
  }

  return (
    <div className="container_object_music">
      <header className="container_header_play_music">
        <img onClick={handleGoBack} src={returnIcon} alt="voltar para a página anterior" />
        <div id="container_text_description">
          <span id="text_description">{clickedMusic.description}</span>
        </div>
      </header>
      <img
        id="image_play_music"
        src={clickedMusic.image}
        alt={clickedMusic.title}
      />
      {showTimeMusic()}
      <h2>{clickedMusic.title}</h2>
      <Audio
        clickedMusic={clickedMusic}
        handleAudioValue={handleAudioValue}
        isPlay={isPlay}
        audioRef={audioRef}
      />
    </div>
  );
}

Play.propTypes = {
  returnIcon: PropTypes.string.isRequired,
  musics: PropTypes.array.isRequired,
  clickedMusic: PropTypes.object.isRequired,
  handleAudioValue: PropTypes.func.isRequired,
  showTimeMusic: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired,
  audioRef: PropTypes.object.isRequired,
}

export default Play;
