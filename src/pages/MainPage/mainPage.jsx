import Header from "../Header/header";
import ListMusic from "../../components/ListMusic/listMusic";
import Start from "../../components/Start/start";
import "./mainPage.css";

function MainPage() {

  return (
    <div className="container_manager_main_page">
      <ListMusic />
      <Start />
      <Header />
    </div>
  );
}
export default MainPage;
