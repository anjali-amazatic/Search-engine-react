import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "./UI/BackButton";
import axiosInstance from "../axios";

const loginURL = process.env.REACT_APP_BASE_API_URL + "api/user/login/";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginIsValid, setLoginFormIsValid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance
      .post(`${loginURL}`, {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast("Logged in successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast("unable to login");
      });
  };
  return (
    <div className="login-page">
      <BackButton />
      <form className="loginForm" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Log In</legend>
          <ul>
            <li>
              <label htmlFor="username">
                Username:<span>*</span>
              </label>
              <input
                type="text"
                id="username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginFormIsValid(true);
                }}
              />
            </li>
            <li>
              <label htmlFor="password">
                Password:<span>*</span>
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginFormIsValid(true);
                }}
              />
            </li>
          </ul>
        </fieldset>
        <button className="login-button" disabled={!loginIsValid}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
