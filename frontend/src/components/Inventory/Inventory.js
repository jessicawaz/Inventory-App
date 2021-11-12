import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import DeleteIcon from "@material-ui/icons/Delete";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";

const Inventory = () => {
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Require all fields using yup
  const checkFields = yup.object().shape({
    itemName: yup.string().required(),
    barcode: yup.string().required(),
    quantity: yup.number().required(),
    price: yup.number().required(),
  });

  // Get inventory from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/getInventory")
      .then((inv) => setItems(inv.data));
  }, []);

  const add = async (e) => {
    let formData = {
      itemName,
      barcode,
      quantity,
      price,
    };
    const fieldsEntered = await checkFields.isValid(formData);

    // Add item to MongoDB if all fields are entered
    if (fieldsEntered) {
      axios.post("http://localhost:5000/newInventory", {
        itemName: itemName,
        barcode: barcode,
        quantity: quantity,
        price: price,
      });
    } else if (!fieldsEntered) {
      alert("Please enter values into all fields");
    }
  };

  // Delete item from MongoDB using the backend API
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`);
  };

  return (
    <div>
      <div className="middle">
        <div className="inventory">
          <h1>Display Inventory Section</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Barcode</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.barcode}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>
                      <a
                        className="btn"
                        href="/home"
                        onClick={() => {
                          deleteItem(item._id);
                        }}
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="addInv">
        <button
          className="btn btn-outline-primary"
          onClick={() => setButtonClicked(!buttonClicked)}
        >
          Add New Item
        </button>
      </div>

      {buttonClicked ? (
        <div className="addInv info">
          <form>
            <h2>Item Info</h2>
            <h1>Item Name</h1>
            <input
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              size="12"
              type="text"
              value={itemName.itemName}
              name="itemName"
            />
            <h1>Barcode</h1>
            <input
              onChange={(e) => {
                setBarcode(e.target.value);
              }}
              size="12"
              type="text"
              value={barcode.barcode}
              name="barcode"
            />
            <h1>Quantity</h1>
            <input
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              size="12"
              type="text"
              value={quantity.quantity}
              name="quantity"
            />
            <h1>Price</h1>
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              size="12"
              type="text"
              value={price.price}
              name="price"
            />
            <div className="addInv">
              <button onClick={add} className="insert-btn">
                Update Inventory
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Inventory;
