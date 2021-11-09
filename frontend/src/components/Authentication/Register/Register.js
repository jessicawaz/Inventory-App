import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Register/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
      })
      .then(console.log(name, email, password));
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerHandler}>Register</button>
      </form>
    </div>
  );
};

export default Register;
