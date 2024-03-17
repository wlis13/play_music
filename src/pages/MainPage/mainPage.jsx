import Header from "../Header/header";
import ListMusic from "../../components/ListMusic/listMusic";
import "./mainPage.css";

function MainPage() {
  return (
    <div className="container_manager_main_page">
      <ListMusic />
      <Header />
    </div>
  );
}
export default MainPage;
