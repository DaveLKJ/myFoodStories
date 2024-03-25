import { useState, useEffect } from "react";
import axios from "axios";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

const tripUrl = "https://api.content.tripadvisor.com/api/v1/location/search";
const tripApiKey = process.env.REACT_APP_TRIPADVISOR_API_KEY;

function Places({ setFoodPlaces }) {
  const [place, setPlace] = useState([]);

  async function getPlace(placeName) {
    const options = await axios.get(`${tripUrl}`, {
      params: {
        key: tripApiKey,
        searchQuery: `${placeName} Singapore`,
        category: "restaurants",
        language: "en",
      },
      headers: { accept: "application/json" },
    });
    setFoodPlaces(options.data[0]);
  }

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(airtableUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      const placeRecords = await response.data.records;
      setPlace(placeRecords);
    };

    getData();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      {place?.length > 0
        ? place?.map((el) => (
            <div onClick={() => getPlace(el.fields.Name)}>{el.fields.Name}</div>
          ))
        : "Loading...."}
    </div>
  );
}

export default Places;
