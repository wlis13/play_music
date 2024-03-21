import { useContext, useEffect, useRef } from "react";
import MyContext from "../../context/context";
import iconFavicon from "./images/spotyfree_favidon.png";
import ShowLoad from "../ShowLoad/showLoad";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Hammer from "hammerjs";

function ListMusics() {
  const {
    musics,
    // filteredPageLike,
    setClickedMusic,
    setShowPlay,
    showPlay,
    storageLikeList,
    isLike,
    likeMusic,
    setIsPlay,
    matrixMusic
    // paginationControl
  } = useContext(MyContext);

  const carouselRef = useRef(null);


  function handleRoute(id) {
    setIsPlay(true);
    if (showPlay === "list_like" || isLike) {
      setClickedMusic(likeMusic.findIndex((music) => music._id === id));
      setShowPlay("reproduction");
      const audio = document.getElementById("audio");
      audio.paused && audio.play();
    } else {
      setClickedMusic(musics.findIndex((music) => music._id === id));
      setShowPlay("reproduction");
      const audio = document.getElementById("audio");
      audio.paused && audio.play();
    }
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
      className={`container_manager_list_music ${showPlay === "list_like" || isLike ? "layout_like_page" : ""}`}
    >

      <Carousel
        controls={false}
        interval={null}
        indicators={false}
      >
        {
          musics.length > 0 ? matrixMusic.map((music) => (
            <Carousel.Item key={music.title}>
              <div
                className="container_list_musics"
              >
                {
                  music.filter((item) => showPlay === "list_like" || isLike ? storageLikeList.includes(item._id) : item).map((ms) => (
                    <section
                      onClick={() => { handleRoute(ms._id) }}
                      key={ms.title}
                    >
                      <img className={`icon_aside ${showPlay === "list_like" || isLike ? "icon_aside_like_page" : ""}`}
                        src={iconFavicon}
                        alt="apotyfree"
                      />
                      <div
                        style={{
                          backgroundImage: `url(${ms.image})`,
                          backgroundSize: "100% 100%",
                          backgroundRepeat: "no-repeat"
                        }}
                        className={`image_music ${showPlay === "list_like" || isLike ? "image_music_like_page" : ""}`}>
                      </div>
                      <aside className={`title_and_category ${showPlay === "list_like" || isLike ? "title_and_category_like_page" : ""}`}>
                        <h2>{ms.title}</h2>
                        <h3>{ms.category}</h3>
                      </aside>
                    </section>
                  ))
                }
              </div>
            </Carousel.Item>
          ))
            : <ShowLoad />
        }
      </Carousel>
    </div>
  );
}

export default ListMusics;
