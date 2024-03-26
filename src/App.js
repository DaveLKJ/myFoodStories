import { useState } from "react";
import "./App.css";
import FindNewPlace from "./FindNewPlace";
import List from "./List";

function App() {
  const [foodPlaces, setFoodPlaces] = useState();

  return (
    <div className="App">
      <h1>My Food Journey</h1>
      <FindNewPlace />
      <List />
    </div>
  );
}

export default App;
