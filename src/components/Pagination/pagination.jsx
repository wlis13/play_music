import { useContext } from "react";
import paginationImage from "./images/play.png";
import "./pagination.css";
import MyContext from "../../context/context";

function Pagination() {

  const { paginationControl, setPaginationControl, musics } = useContext(MyContext);

  function paginationed(control) {
    if (control === "next") {
      if (paginationControl.end < musics.length - 1) {
        setPaginationControl({
          init: paginationControl.init + 8,
          end: paginationControl.end + 8,
          count: paginationControl.count + 1
        })
      }
    } else {
      if (paginationControl.init > 0) {
        setPaginationControl({
          init: paginationControl.init - 8,
          end: paginationControl.end - 8,
          count: paginationControl.count - 1
        })
      }
    }
  }

  return (
    <div className="container_manager_pagination">
      <img
        id="prev_pagination"
        src={paginationImage}
        alt="página anterior"
        onClick={() => { paginationed("prev") }}
      />
      <h1>{`${paginationControl.count}`}</h1>
      <img
        id="next_pagination"
        src={paginationImage}
        alt="próxima página"
        onClick={() => { paginationed("next") }}
      />
    </div>
  );
}
export default Pagination;
