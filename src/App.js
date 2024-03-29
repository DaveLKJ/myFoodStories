import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import FindNewPlace from "./FindNewPlace";
import List from "./WishList";

function App() {
  const [foodPlaces, setFoodPlaces] = useState();

  return (
    <Router>
      <div className="App">
        <h1>My Food Journey</h1>

        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/List">List</a>
            </li>
            <li>
              <a href="/FindNewPlace">Wish List</a>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/List">
            <List foodPlaces={foodPlaces} />
          </Route>

          <Route path="/FindNewPlace">
            <FindNewPlace setFoodPlaces={setFoodPlaces} />
          </Route>

          {/* <Route path="/">
            <Redirect to="/List" />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
