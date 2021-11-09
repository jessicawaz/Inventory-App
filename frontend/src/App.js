import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inventory from "./components/Inventory/Inventory.js";
import Navbar from "./components/Navbar/Navbar.js";
import Help from "./components/Help/Help.js";
import Register from "./components/Authentication/Register/Register.js";
import Login from "./components/Authentication/Login/Login.js";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/help" component={Help}></Route>
          <Route path="/home" component={Inventory}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
