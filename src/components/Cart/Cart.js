import React from "react";
import classes from "./Cart.module.css";
import LoginButton from "../UI/LoginButton";
import SignupButton from "../UI/SignupButoon";
import logo from "../assets/logo.png";
import SearchBar from "../SearchBar/SearchBar";
import LogOutButton from "../UI/LogOutButton";
// import UserInfo from "../UserInfo/UserInfo";

const Cart = () => {
  return (
    <>
      <div className={classes.backgroundimg}>
        <LoginButton />
        <LogOutButton />
        <SignupButton />
        <div className={classes.logo}>
          <img src={logo} alt="My search!" />
          <SearchBar />
          {/* <UserInfo/> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
