import { useContext } from "react";
import "./listMusic.css";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";
import iconFavicon from "./images/spotyfree_favidon.png";

function ListMusic() {

  const { musics } = useContext(MyContext);

  return (
    <div className="container_manager_list_music">
      {musics.length > 0 ?
        musics.map((music) => (
          <section key={music.title}>
            <img id="icon_aside" src={iconFavicon} alt="apotyfree" />
            <img src={music.image} alt={music.title} />
            <aside>
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
export default ListMusic;
