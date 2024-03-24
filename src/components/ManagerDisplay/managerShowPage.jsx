import { useContext } from "react";
import MyContext from "../../context/context";
import PlayMusic from "../../pages/PlayMusic/playMusic";
import ListMusics from "./listMusic";
import ListLike from "../ListLike/listLike";
import SearchPage from "../../pages/SearchPage/searchPage";
import "./managerShowPage.css";
import CategoryMusic from "./CategoryMusic/categoryMusic";

function ManagerShowPage() {

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
    } else if (showPlay === "category_music") {
      return (
        <CategoryMusic />
      )
    }
  }

  return (
    <div>
      {
        handleDisplay()
      }
    </div>

  );
}
export default ManagerShowPage;
