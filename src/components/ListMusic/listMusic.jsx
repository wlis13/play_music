import { useContext } from "react";
import "./listMusic.css";
import MyContext from "../../context/context";
import ShowLoad from "../ShowLoad/showLoad";
import iconFavicon from "./images/spotyfree_favidon.png";
import PlayMusic from "../../pages/PlayMusic/playMusic";

function ListMusic() {


  const {
    musics,
    setClickedMusic,
    pageLike,
    showPlay,
    setShowPlay
  } = useContext(MyContext);

  function handleRoute(id) {
    setClickedMusic(musics.findIndex((music) => music._id === id));
    setShowPlay(true);
  }

  return (
    <div>
      <div
        className={`container_manager_list_music ${showPlay ? "not_showing_list_music" : ""}`}
      >
        {musics.length > 0 ?
          musics.filter((item) => pageLike ? item.like === true : item)
            .slice(!pageLike && 0, 8)
            .map((music) => (
              <section
                onClick={() => { handleRoute(music._id) }}
                key={music.title}>
                <img className="icon_aside" src={iconFavicon} alt="apotyfree" />
                <img className="image_music" src={music.image} alt={music.title} />
                <aside className="title_and_category">
                  <h2>{music.title}</h2>
                  <h3>{music.category}</h3>
                </aside>
              </section>
            ))
          : <ShowLoad />
        }
      </div>
      <PlayMusic
        showPlay={showPlay}
      />

    </div>

  );
}
export default ListMusic;
