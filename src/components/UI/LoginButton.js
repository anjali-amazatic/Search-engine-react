import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Button.module.css";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className={classes.login}
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
    </>
  );
};

export default LoginButton;
