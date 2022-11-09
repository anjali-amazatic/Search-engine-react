import { React,useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "./UI/BackButton";

const registrationURL = process.env.REACT_APP_BASE_API_URL + "api/user/signup/";

const Signup = () => {
  const navigate = useNavigate();

  // const [firstName, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [username, setUser] = useState("");
  // const [email, setUserEmail] = useState("");
  // const [password, setPass] = useState("");
  // const [confirmpass, setconfirmpass] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const createPost = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPass) {
      toast("Password Doesn't Match!");
    }
    // if (userData.firstName<=0 &&)
    else{
    axios
      .post(`${registrationURL}`, {
        username: userData.userName,
        password: userData.password,
        confirmpass: userData.confirmPass,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
      })
      .then((res) => {
        toast("Registration Successfull...!");
        navigate("/login");
      })
      .catch((err) => {
        toast(err.message);
      });}
  };

  return (
    <>
      <div className="reg-page">
        <form className="sign_up" onSubmit={createPost}>
          <BackButton />
          <h2>Sign Up!</h2>
          <fieldset>
            <span>If already have account go to Login!</span>
            <legend>Create Account</legend>
            <ul>
              <li>
                <label htmlFor="firstname">FirstName:</label>
                <input
                  type="text"
                  id="firstname"
                  required
                  // value={firstName}
                  onChange={(e) => {
                    // setFirstname(e.target.value);
                    handleChange("firstName", e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="lastname">LastName:</label>
                <input
                  type="text"
                  id="lastname"
                  required
                  onChange={(e) => {
                    handleChange("lastName", e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  required
                  onChange={(e) => {
                    handleChange("userName", e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  required
                  onChange={(e) => {
                    handleChange("email", e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  required
                  onChange={(e) => {
                    handleChange("password", e.target.value);
                  }}
                />
              </li>
              <li>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  required
                  onChange={(e) => {
                    handleChange("confirmPass", e.target.value);
                  }}
                />
              </li>
            </ul>
          </fieldset>
          <button className="reg-button" type="submit" onClick={() => {}}>
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
