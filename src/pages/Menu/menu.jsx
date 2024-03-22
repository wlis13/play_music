import homeIcon from "./images/home_white.png";
import searchIcon from "./images/search-white.png";
import likeIcon from "./images/like.png";
import notLikeIcon from "./images/not_like.png";
import spotyfreeIcon from "./images/spotyfree_logo.png";
import { useContext } from "react";
import "./menu.css";
import MyContext from "../../context/context";

function Menu() {

  const {
    setFilteredPageLike,
    isLike,
    setIsLike,
    setShowPlay,
    musics,
    storageLikeList,
    setLikeMusic,
    setClickedMusic,
    setIsCategory,
    setIsPlay
  } = useContext(MyContext);

  const listIcons = [
    { name: "home", default: homeIcon, title: "Início" },
    { name: "search", default: searchIcon, title: "Buscar" },
    { name: "handleLike", default: isLike ? likeIcon : notLikeIcon, title: "Favoritos" },
    { name: "spotyfree", default: spotyfreeIcon, title: "Premium" }
  ]

  function handleLike() {
    const filtered = musics.filter((music) => storageLikeList.includes(music._id));
    setLikeMusic(filtered);
    if (filtered.length > 0) {
      setClickedMusic(filtered.findIndex((music) => storageLikeList
        .includes(music._id)));
    }
    setFilteredPageLike(true);
    setIsLike(true);
    setIsCategory(false);
    setIsPlay(false);
    setShowPlay("list_like");
  }

  function handleHome() {
    setFilteredPageLike(false);
    setIsLike(false);
    setIsPlay(false);
    setIsCategory(false);
    setShowPlay("main_page");
  }

  function handleSearch() {
    setFilteredPageLike(false);
    setIsLike(false);
    setIsPlay(false);
    setShowPlay("search_play");
  }

  function handleClick(name) {
    if (name === "handleLike") {
      handleLike();
    } else if (name === "home") {
      handleHome();
    } else if (name === "search") {
      handleSearch();
    }
  }

  return (
    <div className="container_manager_menu">
      {
        listIcons.map((icon) => (
          <section
            className="container_image_title"
            key={icon.name}
            onClick={() => { handleClick(icon.name) }}
          >
            <img
              src={icon.default}
              alt={icon.name}
              key={icon.name}
            />
            <p>{icon.title}</p>
          </section>
        ))
      }
    </div>
  );
}
export default Menu;
