import PropTypes from "prop-types";
import { useContext } from "react";
import MyContext from "../../context/context";

function Play({
  returnIcon,
  clickedMusic,
  showTimeMusic,
  isLike
}) {

  const { setFilteredPageLike, setShowPlay, isCategory, setIsPlay } = useContext(MyContext);

  function handleAnimation() {
    let root = document.documentElement;
    const text = document.getElementById("text_description");
    if (text) {
      const textLength = -text.getBoundingClientRect().width + "px"
      root.style.setProperty("--length-text", textLength);
    }
  }

  handleAnimation();

  function handleGoBack() {
    if (isLike) {
      setShowPlay("list_like");
    } else if (isCategory) {
      setShowPlay("category_music");
    } else {
      setShowPlay("main_page");
      setIsPlay(false);
    }
    setFilteredPageLike(false);
  }

  return (
    <div className="container_object_music">
      <header className="container_header_play_music">
        <img onClick={handleGoBack} src={returnIcon} alt="voltar para a página anterior" />
        <div id="container_text_description">
          <span id="text_description">{clickedMusic && clickedMusic.description}</span>
        </div>
      </header>
      <img
        id="image_play_music"
        src={clickedMusic && clickedMusic.image}
        alt={clickedMusic && clickedMusic.title}
      />
      {showTimeMusic()}
      <h2>{clickedMusic && clickedMusic.title}</h2>
    </div>
  );
}

Play.propTypes = {
  returnIcon: PropTypes.string.isRequired,
  clickedMusic: PropTypes.object.isRequired,
  showTimeMusic: PropTypes.func.isRequired,
  isLike: PropTypes.bool.isRequired,
}

export default Play;
