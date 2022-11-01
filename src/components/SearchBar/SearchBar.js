import { React, useEffect, useState } from "react";
import classes from "./SearchBar.module.css";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../axios";

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
  const [navigateTo, setNavigateTo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addSearch = (event) => {
    navigate("/usersearch");
    event.preventDefault();

    let list = localStorage.getItem("search")
      ? JSON.parse(localStorage.getItem("search"))
      : [];
    list.push(searchData);

    localStorage.setItem("search", JSON.stringify(list));

    if (list.length >= 3) {
      toast("You Reached search Limit You have to Login!");
      navigate("/login");
      setNavigateTo(true);
    }

    if (navigateTo) {
      // const response = axios.get(`${userMe}`);
      if (localStorage.getItem("token")) {
        for (var seachdata = 0; seachdata < list.length; seachdata++) {
          axiosInstance
            .post(`${saveData}`, {
              search_data: list[seachdata],
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              toast(err);
            });
          localStorage.clear();
        }
      }
    }
  };

  const viewAll = (event) => {
    event.preventDefault();
    axiosInstance
      .get(`${viewall}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const searchList = localStorage.getItem("search");
    if (token && isLoading === false) {
      axiosInstance
        .get(`${userDataUrl}`)
        .then((response) => {
        })
        .catch((err) => {
          toast("Unable to login with provided credentials");
        });
    }
    setIsLoading(true);
    if (searchList) {
      let data = JSON.parse(searchList);
      setSearchDataList(data);
    }
    // let list = localStorage.getItem("search")
    //   ? JSON.parse(localStorage.getItem("search"))
    //   : [];
    // list.push(searchData);
  }, [searchData, isLoading]);

  return (
    <div className={classes.serachForm}>
      <form className={classes.search__form} onSubmit={addSearch}>
        <input
          type="text"
          className={classes.home__input}
          value={searchData}
          onChange={(event) => {
            setSearchData(event.target.value);
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
            {searchDataList.length >= 1 &&
              searchDataList.map((currentSearch, index) => {
                return <div key={index}>{currentSearch}</div>;
              })}
          </div>
          {searchDataList <= 0 && <div>No searches found yet!</div>}

          <button
            className={classes.btn}
            disabled={!viewALl}
            onClick={() => {
              viewAll();
              setViewAll(true);
            }}
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
