import React, { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.post("http://localhost:5000/users", {
      name: name,
      email: email,
      password: password,
    });
  }, [name, email, password]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Username"
          onChange={(e) => setName(e)}
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e)}
        />
        <input
          type="text"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e)}
        />
      </form>
    </div>
  );
};

export default Register;
