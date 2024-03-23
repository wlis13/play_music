import { useContext, useEffect, useRef } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Hammer from "hammerjs";
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
    setIsCategory
  } = useContext(MyContext);

  const carouselRef = useRef(null);

  function handleRoute(id) {
    setIsLike(false);
    setIsCategory(true);
    setIsPlay(true);
    filteredCategory.forEach((item) => {
      setClickedMusic(item.findIndex((music) => music._id === id));
    })
    setShowPlay("reproduction");
    const audio = document.getElementById("audio");
    audio.load() && audio.play();
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    const hammer = new Hammer(carousel);

    hammer.on("swipeleft", () => {
      carousel.dispatchEvent(new Event("slideNext"));
    })

    hammer.on("swiperight", () => {
      carousel.dispatchEvent(new Event("slicePrev"));
    })

    return () => {
      hammer.destroy();
    }
  }, [])

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
