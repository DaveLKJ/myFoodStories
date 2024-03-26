import axios from "axios";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

function Add({ restaurant }) {
  const PostAirtable = async () => {
    try {
      const response = await axios.post(
        airtableUrl,
        {
          records: [
            {
              fields: {
                Name: restaurant.name,
                Address: restaurant.address,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("Added restaurant to airtable: ", restaurant);
    } catch (error) {
      console.log("Error in adding restaurant to airtable: ", restaurant);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <p>Selected Restaurant: {restaurant.name}</p>
      <button onClick={PostAirtable}>Add to Airtable</button>
    </div>
  );
}

export default Add;
