import { Route, Switch } from "react-router-dom"
import Provider from "./context/Provider"
import MainPage from "./pages/MainPage/mainPage"
import PlayMusic from "./pages/PlayMusic/playMusic"

function App() {

  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/play" component={PlayMusic} />
      </Switch>
    </Provider>
  )
}

export default App
