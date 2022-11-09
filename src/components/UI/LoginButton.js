import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Button.module.css";

const LoginButton = () => {
  const navigate = useNavigate();
  const [loggedIn, setLogggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogggedIn(true);
    }
  },[loggedIn]);

  return (
    <>
      {!loggedIn && (
        <button
          className={classes.login}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      )}
    </>
  );
};

export default LoginButton;
