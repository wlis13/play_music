import PropTypes from "prop-types";
// import { useState } from "react";

function Play({
  returnIcon,
  spotyfree,
  clickedMusic,
  handleAudioValue,
  showTimeMusic,
  isPlay,
  audioRef,
}) {
  // const [textPosition, setTextPosition] = useState({
  //   init: 0,
  //   end: 30
  // })

  // function setValue() {
  //   const lengthText = clickedMusic.description.length;
  //   setInterval(() => {
  //     if (textPosition.end < lengthText) {
  //       setTextPosition((prev) => ({ ...prev, end: textPosition.end + 1 }));
  //       console.log(textPosition.end)
  //     }
  //   }, 1000);
  // }


  return (
    <div className="container_object_music">
      <header className="container_header_play_music">
        <img src={returnIcon} alt="voltar para a página anterior" />
        <div id="container_text_description">
          <span id="text_description">{clickedMusic.description.substring(0, 30)}</span>
        </div>
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
