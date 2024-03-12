import MyContext from "./context";
import PropTypes from "prop-types";

function Provider({ children }) {

  const providerValue = {

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
