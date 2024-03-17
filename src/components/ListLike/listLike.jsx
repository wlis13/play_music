import { useContext, useEffect } from "react";
import Header from "../../pages/Header/header";
import ListMusic from "../ListMusic/listMusic";
import MyContext from "../../context/context";
import goBackImage from "./images/arrow_for_down_white.png";
import "./listLike.css";
import { useHistory } from "react-router-dom";

function ListLike() {

  const history = useHistory();
  const { setPageLike, setIsLike } = useContext(MyContext);

  function goBackListLike() {
    history.goBack();
    setPageLike(false);
    setIsLike(false);
  }

  useEffect(() => {
    setPageLike(true);

    function handlePopState() {
      setIsLike(false);
      setPageLike(false);
    }

    return (() => {
      window.addEventListener("popstate", handlePopState)
    })
  }, [setIsLike, setPageLike])

  return (
    <div>
      <header className="container_header_list_like">
        <img
          onClick={goBackListLike}
          src={goBackImage}
          alt="voltar para a página anterior"
        />
      </header>
      <ListMusic />
      <Header />
    </div>
  );
}
export default ListLike;
