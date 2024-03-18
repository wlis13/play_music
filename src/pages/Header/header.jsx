import homeIcon from "./images/home_white.png";
import searchIcon from "./images/search-white.png";
import likeIcon from "./images/like.png";
import notLikeIcon from "./images/not_like.png";
import spotyfreeIcon from "./images/spotyfree_logo.png";
import { useContext } from "react";
import "./header.css";
import MyContext from "../../context/context";

function Header() {

  const { setPageLike, isLike, setIsLike } = useContext(MyContext);

  const listIcons = [
    { name: "home", default: homeIcon, title: "Início" },
    { name: "search", default: searchIcon, title: "Buscar" },
    { name: "handleLike", default: isLike ? likeIcon : notLikeIcon, title: "Favoritos" },
    { name: "spotyfree", default: spotyfreeIcon, title: "Premium" }
  ]

  function handleLike() {
    setPageLike(true);
    setIsLike(true)
  }

  function handleHome() {
    setPageLike(false);
    setIsLike(false);
  }

  function handleClick({ target }) {
    const { alt } = target;
    if (alt === "handleLike") {
      handleLike()
    } else if (alt === "home") {
      handleHome();
    }
  }

  return (
    <div className="container_manager_header">
      {
        listIcons.map((icon) => (
          <section className="container_image_title" key={icon.name}>
            <img
              src={icon.default}
              alt={icon.name}
              key={icon.name}
              onClick={handleClick}
            />
            <p>{icon.title}</p>
          </section>
        ))
      }
    </div>
  );
}
export default Header;
