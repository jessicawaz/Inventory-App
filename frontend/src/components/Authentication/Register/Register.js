import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import "../Register/Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const formYup = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const registerHandler = async (e) => {
    e.preventDefault();

    let formData = {
      name,
      email,
      password,
    };

    const isValidForm = await formYup.isValid(formData);

    if (isValidForm) {
      axios
        .post("http://localhost:5000/users", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          alert("Successfully registered user! Please log in");
          window.location.href = "/login";
        });
    } else {
      alert("Please enter values for all fields.");
    }
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
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        {show ? (
          <div>
            <input
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FontAwesomeIcon
              className="pass"
              icon={faEye}
              onClick={() => setShow(!show)}
            />
          </div>
        ) : (
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <FontAwesomeIcon
              className="pass"
              icon={faEyeSlash}
              onClick={() => setShow(!show)}
            />
          </div>
        )}

        <button className="btn btn-primary" onClick={registerHandler}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
