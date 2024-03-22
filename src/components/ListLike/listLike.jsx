import { useContext, useEffect } from "react";
import MyContext from "../../context/context";
import goBackImage from "./images/arrow_for_down_white.png";
import "./listLike.css";
import ListMusics from "../ManagerDisplay/listMusic";

function ListLike() {

  const {
    setFilteredPageLike,
    setIsLike,
    showPlay,
    setShowPlay,
    setIsPlay
  } = useContext(MyContext);

  function goBackListLike() {
    setFilteredPageLike(false);
    setIsLike(false);
    setIsPlay(false);
    setShowPlay("main_page");
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
      <ListMusics />
    </div>
  );
}
export default ListLike;
