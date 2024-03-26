import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add";

const tripUrl = "https://api.content.tripadvisor.com/api/v1/location/search";
const tripApiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;

function FindNewPlace() {
  const [findPlaces, setFindPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [restaurant, setRestaurant] = useState();

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

  const handleSelect = (restaurant) => {
    setRestaurant(restaurant);
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Search places..."
        value={search}
        onChange={handleSearch}
      />

      {restaurant ? (
        <Add restaurant={restaurant} />
      ) : (
        <div>
          {findPlaces.length > 0 ? (
            findPlaces
              .filter((findPlaces) => findPlaces.name.includes(search))
              .map((findPlaces) => (
                <div key={findPlaces.location_id}>
                  <div>{findPlaces.name}</div>
                  <button onClick={() => handleSelect(findPlaces)}>
                    Select
                  </button>
                </div>
              ))
          ) : (
            <p>Error: Not found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FindNewPlace;
