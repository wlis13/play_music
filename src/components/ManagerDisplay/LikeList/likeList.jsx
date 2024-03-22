import { useContext, useEffect, useRef } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Hammer from "hammerjs";
import MyContext from "../../../context/context";
import "./likeList.css";

function LikeList() {

  const {
    setClickedMusic,
    setShowPlay,
    storageLikeList,
    likeMusic,
    setIsPlay,
    matrixMusic
  } = useContext(MyContext);

  const carouselRef = useRef(null);

  function handleRoute(id) {
    setIsPlay(true);
    setClickedMusic(likeMusic.findIndex((music) => music._id === id));
    setShowPlay("reproduction");
    const audio = document.getElementById("audio");
    audio.paused && audio.play();
  }

  function returnFormattedMatrix() {
    const newMatrix = [];
    let newList = [];

    matrixMusic.forEach((list) => {
      list.forEach((element) => {
        if (storageLikeList.includes(element._id)) {
          newList.push(element);
          if (newList.length === 6) {
            newMatrix.push(newList);
            newList = [];
          }
        }
      });
    })

    newMatrix.push(newList);

    return newMatrix;
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
      className="layout_like_page"
    >
      <Carousel
        controls={false}
        interval={null}
        indicators={false}
      >
        {
          returnFormattedMatrix().map((music, index) => (
            <Carousel.Item key={index}>
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
                        className="image_music_like_page"
                      >
                        <img className="icon_aside_like_page"
                          src={iconFavicon}
                          alt="apotyfree"
                        />
                      </div>
                      <aside className="title_and_category_like_page">
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
export default LikeList;
