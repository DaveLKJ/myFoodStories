import { useState, useEffect } from "react";
import axios from "axios";
import DeleteWishList from "./DeleteWishList";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

function WishList() {
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

  const handleDelete = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div  style={{ margin: "20px" }}>
      <h2>Restaurant Wish List</h2>
      <table className="table">
        <tbody>
          {list.map((item) => (
            <tr key={item.fields.Name}>
              <td>
                <DeleteWishList
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WishList;
