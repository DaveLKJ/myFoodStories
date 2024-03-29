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
    fetchData(search);
  }, [search]);

  const fetchData = async (searchQuery) => {
    try {
      const response = await axios.get(tripUrl, {
        params: {
          key: tripApiKey,
          searchQuery: searchQuery,
          category: "restaurants",
          language: "en",
        },
        headers: { accept: "application/json" },
      });
      console.log("response ", response);
      console.log("response.data.data ", response.data.data);
      setFindPlaces(response.data.data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

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
      <button onClick={() => fetchData(search)}>Search</button>

      {restaurant ? (
        <Add restaurant={restaurant} />
      ) : (
        <div>
          {findPlaces.length > 0 ? (
            <table>
              <tbody>
                {findPlaces
                  .filter((place) =>
                    place.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((place) => (
                    <tr key={place.location_id}>
                      <td>{place.name}</td>
                      <td>
                        <button onClick={() => handleSelect(place)}>
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No places found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FindNewPlace;
