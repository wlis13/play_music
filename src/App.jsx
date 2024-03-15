import { Route, Switch } from "react-router-dom"
import Provider from "./context/Provider"
import MainPage from "./pages/MainPage/mainPage"
import PlayMusic from "./pages/PlayMusic/playMusic"
import ListLike from "./components/ListLike/listLike"

function App() {

  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/play" component={PlayMusic} />
        <Route exact path="/play_like" component={ListLike} />
      </Switch>
    </Provider>
  )
}

export default App
