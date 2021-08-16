import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import SettingsIcon from "@material-ui/icons/Settings";
import Help from "@material-ui/icons/HelpOutline";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { Table } from "reactstrap";

const Inventory = () => {
  const [itemName, setItemName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const add = (e) => {
    axios.post("http://localhost:5000/newInventory", {
      itemName: itemName,
      barcode: barcode,
      quantity: quantity,
      price: price,
    });
  };

  return (
    <div>
      <div className="navbar" id="navbar">
        <a href="#default" className="logo" id="logo">
          Logo
        </a>
        <div className="navbar-rt" id="navbar-rt">
          <a href="#home" className="active">
            Home
          </a>
          <a href="#settings">
            <SettingsIcon />
          </a>
          <a href="#account">
            <AccountIcon />
          </a>
          <a href="#help">
            <Help />
          </a>
        </div>
      </div>
      <div className="middle">
        <div className="inventory">
          <h1>Display Inventory Section</h1>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Barcode</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>item</td>
                <td>barcode</td>
                <td>quantity</td>
                <td>price</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>item</td>
                <td>barcode</td>
                <td>quantity</td>
                <td>price</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="addInv">
        <button>Add New Inventory Log</button>
        <form>
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
          <button onClick={add} className="insert-btn">
            Update Inventory
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
