import homeIcon from "./images/home_white.png";
import searchIcon from "./images/search-white.png";
import likeIcon from "./images/like.png";
import notLikeIcon from "./images/not_like.png";
import spotyfreeIcon from "./images/spotyfree_logo.png";
import { useContext } from "react";
import "./header.css";
import MyContext from "../../context/context";

function Header() {

  const {
    setFilteredPageLike,
    isLike,
    setIsLike,
    setShowPlay,
    musics,
    storageLikeList,
    setLikeMusic,
    likeMusic,
    setClickedMusic
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
    if (likeMusic.length > 0) {
      setClickedMusic(likeMusic.findIndex((music) => storageLikeList
        .includes(music._id)));
    }
    setFilteredPageLike(true);
    setIsLike(true);
    setShowPlay("list_like");
  }

  function handleHome() {
    setFilteredPageLike(false);
    setIsLike(false);
    setShowPlay("main_page");
  }

  function handleClick(name) {
    if (name === "handleLike") {
      handleLike()
    } else if (name === "home") {
      handleHome();
    }
  }

  return (
    <div className="container_manager_header">
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
export default Header;
