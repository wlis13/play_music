import PropType from "prop-types";

function Audio({ audioRef, isPlay, clickedMusic, handleAudioValue }) {
  return (
    <div>
      <audio
        ref={audioRef}
        autoPlay={isPlay}
        id="audio"
        src={clickedMusic && clickedMusic.music}
        onTimeUpdate={handleAudioValue}
      />
    </div>
  );
}

Audio.propTypes = {
  audioRef: PropType.object.isRequired,
  isPlay: PropType.bool.isRequired,
  clickedMusic: PropType.object.isRequired,
  handleAudioValue: PropType.func.isRequired,
}

export default Audio;
