import Footer from "../Footer/footer";
import Header from "../Header/header";
import ListMusic from "../ListMusic/listMusic";
import "./mainPage.css";

function MainPage() {
  return (
    <div className="container_manager_main_page">
      <ListMusic />
      <Header />
      <Footer />
    </div>
  );
}
export default MainPage;
