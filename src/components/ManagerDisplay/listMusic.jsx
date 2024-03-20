import { useContext } from "react";
import MyContext from "../../context/context";
import iconFavicon from "./images/spotyfree_favidon.png";
import ShowLoad from "../ShowLoad/showLoad";

function ListMusics() {
  const {
    musics,
    filteredPageLike,
    setClickedMusic,
    setShowPlay,
    showPlay,
    storageLikeList,
    isLike,
    likeMusic
  } = useContext(MyContext);


  function handleRoute(id) {
    if (showPlay === "list_like" || isLike) {
      setClickedMusic(likeMusic.findIndex((music) => music._id === id));
      setShowPlay("reproduction");
      const audio = document.getElementById("audio");
      audio.play();
    } else {
      setClickedMusic(musics.findIndex((music) => music._id === id));
      setShowPlay("reproduction");
      const audio = document.getElementById("audio");
      audio.play();
    }
  }

  return (
    <div
      className={`container_manager_list_music ${showPlay === "list_like" || isLike ? "layout_like_page" : ""}`}
    >
      {musics.length > 0 ?
        musics.filter((item) => showPlay === "list_like" || isLike ? storageLikeList.includes(item._id) : item)
          .slice(!filteredPageLike && 0, 8)
          .map((music) => (
            <section
              onClick={() => { handleRoute(music._id) }}
              key={music.title}
            >
              <img className={`icon_aside ${showPlay === "list_like" || isLike ? "icon_aside_like_page" : ""}`}
                src={iconFavicon}
                alt="apotyfree"
              />
              <img className={`image_music ${showPlay === "list_like" || isLike ? "image_music_like_page" : ""}`}
                src={music.image}
                alt={music.title}
              />
              <aside className={`title_and_category ${showPlay === "list_like" || isLike ? "title_and_category_like_page" : ""}`}>
                <h2>{music.title}</h2>
                <h3>{music.category}</h3>
              </aside>
            </section>
          ))
        : <ShowLoad />
      }
    </div>
  );
}
export default ListMusics;
