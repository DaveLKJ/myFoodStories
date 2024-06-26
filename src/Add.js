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
      alert("Restaurant added");
    } catch (error) {
      console.log(restaurant.name);
      console.log("Error in adding restaurant to airtable: ", restaurant);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <p>
        {restaurant.name}
        <button onClick={PostAirtable}>Add to wishlist</button>
      </p>
    </div>
  );
}

export default Add;
