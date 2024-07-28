import { useContext, useRef } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
import MyContext from "../../../context/context";
import "./likeList.css";

function LikeList() {

  const {
    setClickedMusic,
    setShowPlay,
    storageLikeList,
    likeMusic,
    setIsPlay,
    matrixMusic,
    setIsLike,
    setIsCategory
  } = useContext(MyContext);

  function handleRoute(id) {
    setIsPlay(true);
    setIsLike(true);
    setIsCategory(false);
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
          if (newList.length === 3) {
            newMatrix.push(newList);
            newList = [];
          }
        }
      });
    })
    
    newMatrix.push(newList);

    return newMatrix;
  }

  return (
    <div
      className="container_manager_list_like"
    >
        {
          returnFormattedMatrix().map((music) => (
              <div
                className="container_list_like"
              >
                {
                  music.map((ms) => (
                    <section
                      onClick={() => { handleRoute(ms._id) }}
                      key={ms.title}
                      className="container_section_like"
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
          ))
        }
    </div>
  );
}

export default LikeList;
