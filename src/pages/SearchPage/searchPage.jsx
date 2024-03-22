import { useContext, useState } from "react";
import Header from "../../components/Header/header";
import searchImage from "./images/icon_search_gray.png";
import "./searchPage.css";
import MyContext from "../../context/context";

function SearchPage() {

  const { musics, setIsCategory, setIsLike, setShowPlay } = useContext(MyContext);

  const listCategories = [
    { name: "anos 80", className: "anos_80" },
    { name: "rock'n roll", className: "rockn_roll" },
    { name: "hip-hop", className: "hip_hop" },
    { name: "cristã", className: "crista" },
    { name: "reggae", className: "reggae" },
  ]

  const [hideSearchIcon, setHideSearchIcon] = useState(true);

  function handleHideIcon({ target }) {
    const { value } = target;
    if (!value) {
      setHideSearchIcon(true);
    } else {
      setHideSearchIcon(false);
    }
  }

  function handleCategories(category) {
    setShowPlay("category_music")
    setIsCategory(true);
    setIsLike(false);
    const filteredByCategory = musics
      .filter((item) => item.category === category);
    let list = [];
    const matrix = [];
    filteredByCategory.forEach((item) => {
      if (list.length <= 6) {
        list.push(item)
      } else {
        matrix.push(list);
        list = [];
      }
    });
    if (list.length <= 6) {
      matrix.push(list)
    }

    localStorage.setItem("listCategoryMusic", JSON.stringify(matrix));
  }

  return (
    <div className="container_manager_search_page">
      <Header />
      <section className="container_section_search_page">
        <input
          id="input_search"
          type="search"
          onChange={handleHideIcon}
        />
        <img
          style={{ display: hideSearchIcon ? "block" : "none" }}
          id="search_image"
          src={searchImage} alt="busca música pelo nome" />
        {
          listCategories.map((category) => (
            <div
              className={`${category.className} categories`}
              key={category.name}
              onClick={() => {
                handleCategories(category.name);
              }}
            >
              <h2>{category.name}</h2>
            </div>
          ))
        }
      </section>
    </div>
  );
}
export default SearchPage;
