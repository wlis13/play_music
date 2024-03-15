import PropTypes from "prop-types";

function Play({
  returnIcon,
  spotyfree,
  clickedMusic,
  handleAudioValue,
  showTimeMusic,
  isPlay,
  audioRef,
}) {
  return (
    <div className="container_object_music">
      <header className="container_header_play_music">
        <img src={returnIcon} alt="voltar para a página anterior" />
        <p>{(clickedMusic.description).substring(0, 30)}</p>
        <img src={spotyfree} alt="spoty free" />
      </header>
      <img
        id="image_play_music"
        src={clickedMusic.image}
        alt={clickedMusic.title}
      />
      {showTimeMusic()}
      <h2>{clickedMusic.title}</h2>
      <audio
        ref={audioRef}
        autoPlay={isPlay}
        id="audio"
        src={clickedMusic.music}
        onTimeUpdate={handleAudioValue}
      />
    </div>
  );
}

Play.propTypes = {
  returnIcon: PropTypes.object.isRequired,
  musics: PropTypes.array.isRequired,
  spotyfree: PropTypes.object.isRequired,
  clickedMusic: PropTypes.bool.isRequired,
  handleAudioValue: PropTypes.func.isRequired,
  showTimeMusic: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired,
  audioRef: PropTypes.number.isRequired,
}

export default Play;
