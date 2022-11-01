import classes from "./Button.module.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";

const logOutURL = process.env.REACT_APP_BASE_API_URL + "api/logoutall/";

const LogOutButton = () => {
  const navigate = useNavigate();

  const logOut = () => {
    axiosInstance.post(`${logOutURL}`).then((response) => {
      if (!localStorage.getItem("token")) {
        toast("User haven't logged in yet!");
      }
      toast("Logged Out Successfully!");
      localStorage.clear();
      navigate("/");
    });
  };

  return (
    <>
      <button
        className={classes.delete}
        onClick={() => {
          logOut();
        }}
      >
        LogOut
      </button>
    </>
  );
};

export default LogOutButton;
