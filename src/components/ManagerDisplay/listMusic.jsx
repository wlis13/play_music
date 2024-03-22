import { useContext } from "react";
import LikeList from "./LikeList/likeList";
import MyContext from "../../context/context";
import MainList from "./MainList/mainList";

function ListMusics() {

  const { showPlay, isLike } = useContext(MyContext);
  return (
    <div>
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
