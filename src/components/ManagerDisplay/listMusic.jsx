import { useContext } from "react";
import MyContext from "../../context/context";
import iconFavicon from "./images/spotyfree_favidon.png";
import ShowLoad from "../ShowLoad/showLoad";

function ListMusics() {
  const { musics, filteredPageLike, setClickedMusic, setShowPlay } = useContext(MyContext);

  function handleRoute(id) {
    setClickedMusic(musics.findIndex((music) => music._id === id));
    setShowPlay("reproduction");
    const audio = document.getElementById("audio");
    audio.play()
  }

  return (
    <div
      className={`container_manager_list_music`}
    >
      {musics.length > 0 ?
        musics.filter((item) => filteredPageLike ? item.like === true : item)
          .slice(!filteredPageLike && 0, 8)
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
  );
}
export default ListMusics;
