import { Route, Switch } from "react-router-dom"
import Provider from "./context/Provider"
import MainPage from "./pages/MainPage/mainPage"

function App() {

  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Provider>
  )
}

export default App
