import { useContext, useEffect, useRef } from "react";
import paginationImage from "./images/play.png";
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

  // function paginationed(control) {
  //   if (control === "next") {
  //     if (paginationControl.end < musics.length - 1) {
  //       setPaginationControl({
  //         init: paginationControl.init + 8,
  //         end: paginationControl.end + 8,
  //         count: paginationControl.count + 1
  //       })
  //     }
  //   } else {
  //     if (paginationControl.init > 0) {
  //       setPaginationControl({
  //         init: paginationControl.init - 8,
  //         end: paginationControl.end - 8,
  //         count: paginationControl.count - 1
  //       })
  //     }
  //   }
  // }

  useEffect(() => {
    const container = containerRef.current;
    const hammer = new Hammer(container);

    hammer.on("swipeleft", () => {
      if (paginationControl.init > 0) {
        setPaginationControl({
          init: paginationControl.init - 8,
          end: paginationControl.end - 8,
          count: paginationControl.count - 1
        })
      }
    })

    hammer.on("swiperight", () => {
      if (paginationControl.end < musics.length - 1) {
        setPaginationControl({
          init: paginationControl.init + 8,
          end: paginationControl.end + 8,
          count: paginationControl.count + 1
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
      <img
        id="prev_pagination"
        src={paginationImage}
        alt="página anterior"
      // onClick={() => { paginationed("prev") }}
      />
      <h1>{`${paginationControl.count}`}</h1>
      <img
        id="next_pagination"
        src={paginationImage}
        alt="próxima página"
      // onClick={() => { paginationed("next") }}
      />
    </div>
  );
}
export default Pagination;
