import "./styles.css";
import Home from "./Home.js";
import OnePlayerGame from "./OnePlayerGame.js";
import TwoPlayerGame from "./TwoPlayerGame.js";
import {BrowserRouter, Switch, Route} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/one-player">
            <OnePlayerGame />
          </Route>
          <Route exact path="/two-player">
            <TwoPlayerGame />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
