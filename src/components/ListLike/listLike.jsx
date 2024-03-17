import { useContext, useEffect } from "react";
import Header from "../../pages/Header/header";
import ListMusic from "../ListMusic/listMusic";
import "./listLike.css";
import MyContext from "../../context/context";

function ListLike() {

  const { setPageLike } = useContext(MyContext);

  useEffect(() => {
    setPageLike(true)
  }, [setPageLike])

  return (
    <div>
      <ListMusic />
      <Header />
    </div>
  );
}
export default ListLike;
