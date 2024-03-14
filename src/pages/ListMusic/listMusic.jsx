import { useContext } from "react";
import "./listMusic.css";
import MyContext from "../../context/context";
import ShowLoad from "../../components/ShowLoad/showLoad";

function ListMusic() {

  const { musics } = useContext(MyContext);
  return (
    <div>
      {musics.length > 0 ?
        musics.map((music) => (
          <section key={music.title}>
            <img src={music.music} alt={music.title} />
            <aside>
              <h2>{music.title}</h2>
              <h3>{music.category}</h3>
              <p>{music.description}</p>
            </aside>
          </section>
        ))
        : <ShowLoad />
      }
    </div>
  );
}
export default ListMusic;
