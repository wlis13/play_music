import { useContext, useRef } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import MyContext from "../../../context/context";
import "./categoryMusic.css";
import Header from "../../Header/header";

function CategoryMusic() {

  const {
    setClickedMusic,
    setShowPlay,
    setIsPlay,
    filteredCategory,
    setIsLike,
    setIsCategory,
    matrixToList
  } = useContext(MyContext);

  const carouselRef = useRef(null);

  function handleRoute(id) {
    setIsLike(false);
    setIsCategory(true);
    setIsPlay(true);
    filteredCategory
    setClickedMusic(matrixToList(filteredCategory).findIndex((music) => music._id === id));
    setShowPlay("reproduction");
    const audio = document.getElementById("audio");
    audio.load() && audio.play();
  }

  return (
    <div
      ref={carouselRef}
      className="layout_category"
    >
      <Header />
      <Carousel
        controls={false}
        interval={null}
        indicators={false}
        touch={true}
      >
        {
          filteredCategory.map((music, index) => (
            <Carousel.Item key={index}>
              <div
                className="container_list_category"
              >
                <h1 id="category_title">{music.length > 0 ? music[0].category : "<-----"}</h1>
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
                        className="image_music_category"
                      >
                        <img className="icon_aside_category"
                          src={iconFavicon}
                          alt="apotyfree"
                        />
                      </div>
                      <aside className="title_and_category_category">
                        <h2>{ms.title}</h2>
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
export default CategoryMusic;
