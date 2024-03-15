import { useEffect, useState } from "react";
import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const [musics, setMusics] = useState([]);
  const [clickedMusic, setClickedMusic] = useState({});

  async function fetchMusics() {
    const url = "https://playmusicservice.vercel.app/all_musics";
    const promise = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const response = await promise.json();
    setMusics(response);
  }

  useEffect(() => {
    fetchMusics()
  }, [])

  const providerValue = {
    musics,
    clickedMusic,
    setClickedMusic
  }

  return (
    <MyContext.Provider value={providerValue}>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Provider;
