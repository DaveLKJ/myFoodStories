import { useState } from "react";
import axios from "axios";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

function Add(props) {
  const [newPlace, setNewPlace] = useState([]);

  async function updateAirTable(newPlace) {
    try {
      const response = await axios.post(
        airtableUrl,
        {
          records: [
            {
              fields: newPlace,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      alert("succesful");
    } catch (error) {
      alert("Not Successful");
    }
  }

  function handleChange(e) {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
  }

  return (
    <>
      <input
        name="Name"
        placeholder="Name"
        value={newPlace.Name}
        onChange={handleChange}
        required
      />
      <button onClick={() => updateAirTable(newPlace)}>Add</button>
    </>
  );
}

export default Add;
