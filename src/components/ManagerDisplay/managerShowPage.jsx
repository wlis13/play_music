import { useContext } from "react";
import MyContext from "../../context/context";
import PlayMusic from "../../pages/PlayMusic/playMusic";
import ListMusics from "./listMusic";
import ListLike from "../ListLike/listLike";
import SearchPage from "../../pages/SearchPage/searchPage";
import "./managerShowPage.css";
import ShowLoad from "../ShowLoad/showLoad";

function ManagerShowPage() {

  const { musics } = useContext(MyContext);

  const {
    showPlay,
  } = useContext(MyContext);

  function handleDisplay() {
    if (showPlay === "main_page") {
      return (
        <ListMusics />
      )
    } else if (showPlay === "reproduction") {
      return (
        <PlayMusic
          showPlay={showPlay}
        />
      )
    } else if (showPlay === "list_like") {
      return (
        <ListLike />
      )
    } else if (showPlay === "search_play") {
      return (
        <SearchPage />
      )
    }
  }

  return (
    <div>
      {
        musics.length > 0 ?
          handleDisplay()
          :
          <ShowLoad />
      }
    </div>

  );
}
export default ManagerShowPage;
