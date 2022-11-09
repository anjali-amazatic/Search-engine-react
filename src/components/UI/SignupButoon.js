import React, { useEffect, useState } from "react";
import classes from "./Button.module.css";
import { useNavigate } from "react-router-dom";

const SignupButoon = () => {
  const navigate = useNavigate();
  const [loggedIn, setLogggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogggedIn(true);
    }
  }, [loggedIn]);
  return (
    <>
      {!loggedIn && (
        <button
          className={classes.signup}
          onClick={() => {
            navigate("/signup");
          }}
        >
          SignUP
        </button>
      )}
    </>
  );
};

export default SignupButoon;
