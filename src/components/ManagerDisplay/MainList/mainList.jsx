import { useContext, useRef, useState } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import MyContext from "../../../context/context";
import "./mainList.css";

function MainList() {


  const {
    musics,
    setClickedMusic,
    setShowPlay,
    setIsPlay,
    matrixMusic
  } = useContext(MyContext);

  function handleRoute(id) {
    setIsPlay(true);
    setClickedMusic(musics.findIndex((music) => music._id === id));
    setShowPlay("reproduction");
    const audio = document.getElementById("audio");
    audio.paused && audio.play();
  }

  const [index, setIndex] = useState(0);

  function handleSelect(selectedIndex) {
    setIndex(selectedIndex);
  }

  return (
    <div
      className="container_manager_list_music"
    >
        {
          matrixMusic.map((music, index) => (
              <div
                className="container_list_musics"
                key={index}
              >
                {
                  music.map((ms) => (
                    <section
                      onClick={() => { handleRoute(ms._id) }}
                      key={ms._id}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${ms.image})`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat"
                        }}
                        className="image_music"
                      >
                        <img className="icon_aside"
                          src={iconFavicon}
                          alt="apotyfree"
                        />
                      </div>
                      <aside className="title_and_category">
                        <h2>{ms.title.substring(0, 25)}</h2>
                        <h3>{ms.category}</h3>
                      </aside>
                    </section>
                  ))
                }
              </div>
          ))
        }
    </div>
  );
}
export default MainList;
