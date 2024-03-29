import axios from "axios";

const airtableUrl =
  "https://api.airtable.com/v0/appsx7AvYkrm7CafY/tbl1VJLUopl0kNBuC";
const bearerToken = process.env.REACT_APP_AIRTABLE_BEARER_TOKEN;

function DeleteWishList({ item, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${airtableUrl}/${item.id}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      onDelete(item.id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="table">
      <tr>
        <td>{item.fields.Name}</td>
        <td>
          <button onClick={handleDelete}>Delete</button>
        </td>
      </tr>
    </div>
  );
}

export default DeleteWishList;
