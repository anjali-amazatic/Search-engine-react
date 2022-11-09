import { React, useEffect, useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./SearchBar.module.css";
import axiosInstance from "../../axios";
import "react-toastify/dist/ReactToastify.css";

const saveData = process.env.REACT_APP_BASE_API_URL + "api/search/";
const viewall = process.env.REACT_APP_BASE_API_URL + "api/viewall/";
const userDataUrl =
  process.env.REACT_APP_BASE_API_URL + "api/user/get-user-data/";

const SearchBar = () => {
  const navigate = useNavigate();

  const [searchDataList, setSearchDataList] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchIsValid, setSearchFormIsValid] = useState(false);
  const [viewALl, setViewAll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(false);
  // const [userName, setUserName] = useState("");

  const addSearch = (event) => {
    event.preventDefault();
    if (localStorage.getItem("token")) {
      axiosInstance
        .post(`${saveData}`, {
          search_data: searchData,
        })
        .then(() => {
          navigate("/usersearch");
        })
        .catch((err) => {
          toast(err);
        });
    } else {
      let list = localStorage.getItem("search")
        ? JSON.parse(localStorage.getItem("search"))
        : [];
      list.push(searchData);

      navigate("/usersearch");

      if (list.length >= 3 && !localStorage.getItem("token")) {
        setViewAll(true);
        toast("You Reached search Limit You have to Login!");
        navigate("/login");
      }
      localStorage.setItem("search", JSON.stringify(list));
    }
  };

  const viewAll = () => {
    if (isLoggedIn) {
      axiosInstance
        .get(`${viewall}`)
        .then((response) => {
          if (!response.data) {
            toast("Nothing searched yet!");
          } else {
            setSearchDataList(response.data);
            setViewAll(true);
          }
        })
        .catch((err) => {
          toast(err);
        });
    } else {
      toast("You haven't search yet!");
    }
  };
  useEffect(() => {
    const searchList = localStorage.getItem("search");
    if (localStorage.getItem("token") && !isLoggedIn) {
      axiosInstance
        .get(`${userDataUrl}`)
        .then((response) => {
          if (searchList) {
            // setLocalData(searchList);
            JSON.parse(searchList).map((item) => {
              return axiosInstance
                .post(`${saveData}`, {
                  search_data: item,
                })
                .then(() => {
                  setSearchDataList(searchList);
                  localStorage.removeItem("search");
                });
            });
          }
          setIsLoggedIn(true);
        })
        .catch((err) => {
          // toast("User does not exists!");
        });
      axiosInstance
        .get(`${viewall}`)
        .then((response) => {
          setSearchDataList(response.data);
        })
        .catch((err) => {
          // toast("User does not exists!");
        });
    }
    if (searchList) {
      let data = searchList;
      setSearchDataList(data);
      console.log(typeof data);
    }
  }, [isLoggedIn]);

  const renderSearchData = () => {
    if (!viewALl) {
      return searchDataList.slice(0, 3);
    }
    return searchDataList;
  };
  const validate = (inputText) =>{
    setSearchData(inputText.trim(""));
  }
  return (
    <div className={classes.serachForm}>
      <form className={classes.search__form} onSubmit={addSearch}>
        <input
          type="text"
          className={classes.home__input}
          value={searchData}
          onChange={(event) => {
            validate(event.target.value);
            setSearchFormIsValid(true);
          }}
          required
        />
        <div className={classes.home__group}>
          <button
            type="submit"
            className={classes.btn}
            disabled={!searchIsValid}
            // onClick={addSearch}
          >
            Search
          </button>
        </div>
        <FaSearch className={classes.search__icons} />
        <FaMicrophone className={classes.micropphone} />
      </form>

      {/* show item  */}
      <div className={classes.viewcontainer}>
        <div className={classes.home__group}>
          <div className={classes.searches}>
            {renderSearchData().map((search, index) => {
              return <div key={index}>{search.search_data}</div>;
            })}
          </div>
          {!viewALl && searchDataList <= 0 && <div>No searches found yet!</div>}
          <button
            className={classes.btn}
            onClick={() => {
              viewAll()
            }}
          >
          { viewALl? 'Hide all':'View all' }

          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
