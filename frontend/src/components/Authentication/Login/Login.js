import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import "../Login/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  // require fields w/ yup
  const formYup = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  useEffect(() => {
    const verfiy = async () => {
      // used with yup to verify information has been entered
      let formData = { email, password };

      const isValidForm = await formYup.isValid(formData);

      if (!isValidForm) {
        setErrorMsg("Please enter values for all fields");
      }
    };
    verfiy();
  });

  // Used to log user in
  const loginHandler = async (e) => {
    // prevents page from reloading
    e.preventDefault();

    // used with yup to verify information has been entered
    let formData = { email, password };

    const isValidForm = await formYup.isValid(formData);

    if (isValidForm) {
      // send user login data to backend
      axios
        .post("http://localhost:5000/auth", {
          email: email,
          password: password,
        })
        .then((data) => {
          if (data.data.user) {
            // store token in local storage
            localStorage.setItem("user", data.data.user.name);
            localStorage.setItem("token", data.data.token);
            axios
              .get("http://localhost:5000/user", {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              })
              .then(() => {
                setIsAuth(true);
              });
          }
        })
        .catch((err) => {
          setIsAuth(false);
          setErrorMsg(err.response.data.message);
        });
    } else {
      setErrorMsg("Please enter values for all fields");
    }
  };

  return (
    <div>
      <form>
        <h4>Log in</h4>
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

        <button className="forgot btn btn-link">Forgot Password</button>
        <button className="btn-primary" onClick={loginHandler}>
          Sign in
        </button>
        {isAuth ? (
          <div className="alert alert-success">
            <strong>Success!</strong> Redirecting...
            {(window.location.href = "/home")}
          </div>
        ) : (
          <div className="alert alert-danger">
            <strong>Error! </strong>
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
