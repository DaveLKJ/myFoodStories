import { useState } from "react";
import "./App.css";
// import NewForm from "./NewForm";
import FindNewPlace from "./FindNewPlace";
// import Places from "./Places";
// import Add from "./Add";

function App() {
  const [foodPlaces, setFoodPlaces] = useState();

  return (
    <div className="App">
      <h1>My Food Journey</h1>
      {/* <Places setFoodPlaces={setFoodPlaces} /> */}
      <FindNewPlace />
      {/* <Add /> */}
    </div>
  );
}

export default App;
