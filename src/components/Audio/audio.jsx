import PropType from "prop-types";

function Audio({ audioRef, isPlay, clickedMusic, handleAudioValue }) {
  return (
    <div>
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

Audio.propTypes = {
  audioRef: PropType.string.isRequired,
  isPlay: PropType.bool.isRequired,
  clickedMusic: PropType.object.isRequired,
  handleAudioValue: PropType.string.isRequired,
}

export default Audio;
