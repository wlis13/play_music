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

  const carouselRef = useRef(null);

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
      ref={carouselRef}
      className="container_manager_list_music"
    >
      <Carousel
        controls={false}
        interval={null}
        indicators={false}
        pause={false}
        activeIndex={index}
        onSelect={handleSelect}
        touch={true}
        wrap={true}
      >
        {
          matrixMusic.map((music) => (
            <Carousel.Item key={music.title}>
              <div
                className="container_list_musics"
              >
                {
                  music.map((ms) => (
                    <section
                      onClick={() => { handleRoute(ms._id) }}
                      key={ms.title}
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
            </Carousel.Item>
          ))
        }
      </Carousel>
    </div>
  );
}
export default MainList;
