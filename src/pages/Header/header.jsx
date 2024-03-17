import homeIcon from "./images/home_white.png";
import searchIcon from "./images/search-white.png";
import likeIcon from "./images/like.png";
import notLikeIcon from "./images/not_like.png";
import spotyfreeIcon from "./images/spotyfree_logo.png";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import "./header.css";
import MyContext from "../../context/context";

function Header() {

  const history = useHistory();

  const { setPageLike } = useContext(MyContext);

  const [isLike, setIsLike] = useState(false);

  const listIcons = [
    { name: "home", default: homeIcon },
    { name: "search", default: searchIcon },
    { name: "handleLike", default: isLike ? likeIcon : notLikeIcon },
    { name: "spotyfree", default: spotyfreeIcon }
  ]

  function handleLike() {
    setPageLike(true);
    setIsLike(prev => !prev)
    history.push("/play_like")
  }

  function handleClick({ target }) {
    const { alt } = target;
    if (alt === "handleLike") {
      handleLike()
    }
  }

  return (
    <div className="container_manager_header">
      {
        listIcons.map((icon) => (
          <img
            src={icon.default}
            alt={icon.name}
            key={icon.name}
            onClick={handleClick}
          />
        ))
      }
    </div>
  );
}
export default Header;
