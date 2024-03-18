import { useContext, useEffect } from "react";
import ListMusic from "../ManagerDisplay/listMusic";
import MyContext from "../../context/context";
import goBackImage from "./images/arrow_for_down_white.png";
import "./listLike.css";
import { useHistory } from "react-router-dom";

function ListLike() {

  const history = useHistory();
  const { setFilteredPageLike, setIsLike, showPlay } = useContext(MyContext);

  function goBackListLike() {
    history.goBack();
    setFilteredPageLike(false);
    setIsLike(false);
  }

  useEffect(() => {
    setFilteredPageLike(true);

    function handlePopState() {
      setIsLike(false);
      setFilteredPageLike(false);
    }

    return (() => {
      window.addEventListener("popstate", handlePopState)
    })
  }, [setIsLike, setFilteredPageLike])

  return (
    <div>
      <header className={`container_header_list_like ${showPlay !== "list_like" ? "not_show_like" : ""}`}>
        <img
          onClick={goBackListLike}
          src={goBackImage}
          alt="voltar para a página anterior"
        />
      </header>
      <ListMusic />
    </div>
  );
}
export default ListLike;
