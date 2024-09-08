import { useContext } from "react";
import iconFavicon from "../images/spotyfree_favidon.png";
import "bootstrap/dist/css/bootstrap.css";
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

  function treeMusicsForColumn(matrix) {
    let newlist = [];
    matrix.forEach((item, index) => {
      newlist.push(item.slice(index, index + 3))
    })

    return newlist;
  }

  return (
    <div
      className="container_manager_list_category"
    >
      <Header />
      {
        treeMusicsForColumn(filteredCategory).map((music, index) => (
          <div
            className="container_list_category"
            key={index}
          >
            {/* <h1 id="category_title">{music.length > 0 ? music[0].category : "<-----"}</h1> */}
            {
              music.map((ms) => (
                <section
                  onClick={() => { handleRoute(ms._id) }}
                  key={ms.title}
                  className="container_list_category"
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
        ))
      }
    </div>
  );
}
export default CategoryMusic;
