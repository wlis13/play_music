import { useContext, useEffect, useRef } from "react";
import MyContext from "../../context/context";
import Hammer from "hammerjs";
import "./pagination.css";

function Pagination() {

  const {
    paginationControl,
    setPaginationControl,
    musics
  } = useContext(MyContext);

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const hammer = new Hammer(container);

    hammer.on("swipeleft", () => {
      if (paginationControl.end < musics.length - 1) {
        setPaginationControl({
          init: paginationControl.init + 8,
          end: paginationControl.end + 8,
          count: paginationControl.count + 1
        })
      }
    })

    hammer.on("swiperight", () => {
      if (paginationControl.init > 0) {
        setPaginationControl({
          init: paginationControl.init - 8,
          end: paginationControl.end - 8,
          count: paginationControl.count - 1
        })
      }
    })

    return () => {
      hammer.destroy();
    };

  }, [musics.length, paginationControl.count, paginationControl.end, paginationControl.init, setPaginationControl])

  return (
    <div
      className="container_manager_pagination"
      ref={containerRef}
    >
    </div>
  );
}
export default Pagination;
