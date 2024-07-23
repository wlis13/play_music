import { useContext } from "react";
import LikeList from "./LikeList/likeList";
import MyContext from "../../context/context";
import MainList from "./MainList/mainList";
import "./MainList/mainList.css";

function ListMusics() {

  const { showPlay, isLike } = useContext(MyContext);
  return (
    <div
      className="container_every_list_musics"
    >
      {
        showPlay === "list_like" || isLike ?
          <LikeList />
          :
          <MainList />
      }
    </div>
  );
}

export default ListMusics;
