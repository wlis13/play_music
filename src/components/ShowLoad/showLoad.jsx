import initialImage from "./images/initial_image02.gif";
import "./showLoad.css";

function ShowLoad() {
  return (
    <div className="container-show-loading">
      <img id="initial_image" src={initialImage} alt="Imagem de carregamento" />
    </div>
  );
}
export default ShowLoad;
