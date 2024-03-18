import { useContext } from "react";
import "./managerShowPage.css";
import MyContext from "../../context/context";
import PlayMusic from "../../pages/PlayMusic/playMusic";
import ListMusics from "./listMusic";
import ListLike from "../ListLike/listLike";

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
    }
  }

  return (
    <div>
      {handleDisplay()}
    </div>

  );
}
export default ManagerShowPage;
