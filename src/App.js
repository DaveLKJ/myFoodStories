import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import FindNewPlace from "./FindNewPlace";
import WishList from "./WishList";

function App() {
  const [foodPlaces, setFoodPlaces] = useState();

  return (
    <>
      <Router>
        <div className="App">
          <h1>My Food Journey</h1>

          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/FindNewPlace">Add new wish</a>
              </li>
              <li>
                <a href="/WishList">Wish List</a>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/FindNewPlace">
              <FindNewPlace setFoodPlaces={setFoodPlaces} />
            </Route>

            <Route path="/WishList">
              <WishList foodPlaces={foodPlaces} />
            </Route>

            <Route path="/">
            <Redirect to="/" />
          </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
