import goBackImage from "./images/arrow_for_down_white.png";
import "./header.css";
import { useContext } from "react";
import MyContext from "../../context/context";

function Header() {
  const { setShowPlay, showPlay } = useContext(MyContext);

  function handleGoBack() {
    if (showPlay === "category_music") {
      setShowPlay("search_play");
    } else {
      setShowPlay("main_page");
    }


  }

  return (
    <div className="container_manager_header">
      <img
        onClick={handleGoBack}
        src={goBackImage}
        alt="voltar para a página anterior"
      />
    </div>
  );
}
export default Header;
