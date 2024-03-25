import { useState, useEffect } from "react";
import axios from "axios";

const tripUrl = "https://api.content.tripadvisor.com/api/v1/location/search";
const tripApiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;

function FindNewPlace() {
  const [findPlaces, setFindPlaces] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(tripUrl, {
          params: {
            key: tripApiKey,
            searchQuery: "Singapore",
            category: "restaurants",
            language: "en",
          },
          headers: { accept: "application/json" },
        });
        console.log(response);
        setFindPlaces(response.data.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (placeName) => {
    console.log("Clicked on place:", placeName);
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Search places..."
        value={search}
        onChange={handleSearch}
      />
      <button onClick={() => handleClick("Button clicked")}>Find</button>
      <button onClick={() => handleClick("Button clicked")}>Find</button>
      <button onClick={() => handleClick("Button clicked")}>Find</button>
      {findPlaces.length > 0 ? (
        findPlaces
          .filter((findPlaces) => findPlaces.name.includes(search))
          .map((findPlaces) => (
            <div
              key={findPlaces.location_id}
              onClick={() => handleClick(findPlaces.name)}
            >
              {findPlaces.name}
            </div>
          ))
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default FindNewPlace;
