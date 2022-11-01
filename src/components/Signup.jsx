import { React, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "./UI/BackButton";

const registrationURL = process.env.REACT_APP_BASE_API_URL + "api/user/signup/";

const Signup = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUser] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");

  const createPost = (e) => {
    e.preventDefault();
    axios
      .post(`${registrationURL}`, {
        username: username,
        password: password,
        confirmpass: confirmpass,
        email: email,
        first_name: firstname,
        last_name: lastname,
      })
      .then((res) => {
        if (password !== confirmpass) {
          toast("Password Doesn't Match!");
        }
        toast("Registration Successfull...!");
        navigate("/login");
      })
      .catch((err) => {
        toast(err.response.data.non_field_errors[0]);
      });
  };

  return (
    <>
      <div className="reg-page">
        <BackButton />
        <form className="sign_up" onSubmit={createPost}>
          <h2>Sign Up!</h2>
          <fieldset>
            <legend>Create Account</legend>
            <ul>
              <li>
                <label htmlFor="firstname">FirstName:</label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  required
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="lastname">LastName:</label>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  required
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  required
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  required
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmpass}
                  required
                  onChange={(e) => {
                    setconfirmpass(e.target.value);
                  }}
                />
              </li>
            </ul>
          </fieldset>
          <button
            className="reg-button"
            type="submit"
            onClick={() => {}}
          >
            Submit
          </button>
          <button
            className="reg-button"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            Have an Account?
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
