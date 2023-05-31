import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

axios.get("/api/days")
  .then((response) => {
    console.log("Make sure railway API is live", response);
    ReactDOM.render(<Application />, document.getElementById("root"));
  })
  .catch((error) => {
    console.error("API call failed:", error);
    window.location.reload();
  });