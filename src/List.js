import { useState, useEffect } from "react";
import axios from "axios";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

function List() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(airtableUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      const placeRecords = await response.data.records;
      setList(placeRecords);
    };
    getData();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <h2>Restaurant List</h2>
      <ul>
        {list.map((record) => (
          <li key={record.fields.Name}>{record.fields.Name}</li>
        ))}
      </ul>
    </div>
  );
}

export default List;
