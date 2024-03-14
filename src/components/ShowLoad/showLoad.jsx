import imageLoading from "./images/loadImage.gif";
import "./showLoad.css";

function ShowLoad() {
  return (
    <aside className="container-show-loading">
      <img src={imageLoading} alt="ícone de carregando" />
      <p>Aguarde...</p>
    </aside>
  );
}
export default ShowLoad;
