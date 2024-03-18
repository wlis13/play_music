import Header from "../Header/header";
import Start from "../../components/Start/start";
import "./mainPage.css";
import ManagerShowPage from "../../components/ManagerDisplay/managerShowPage";

function MainPage() {

  return (
    <div className="container_manager_main_page">
      <ManagerShowPage />
      <Start />
      <Header />
    </div>
  );
}
export default MainPage;
