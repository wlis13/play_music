import goBackImage from "./images/arrow_for_down_white.png";
import "./header.css";
import { useContext } from "react";
import MyContext from "../../context/context";

function Header() {
  const { setShowPlay } = useContext(MyContext);

  function handleGoBack() {
    setShowPlay("main_page")
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
