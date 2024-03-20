import initialImage from "./images/initial_window.gif";
import "./showLoad.css";

function ShowLoad() {
  return (
    <div className="container-show-loading">
      <img id="initial_image" src={initialImage} alt="Imagem de carregamento" />
    </div>
  );
}
export default ShowLoad;
