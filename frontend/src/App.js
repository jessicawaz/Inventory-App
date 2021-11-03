import { BrowserRouter as Router } from "react-router-dom";
import Inventory from "./components/Inventory/Inventory.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
    <div>
      <Navbar />
      <Inventory />
    </div>
  );
}

export default App;
