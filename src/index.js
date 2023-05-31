import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

const MAX_RELOAD_ATTEMPTS = 3;

function reloadIndexJs() {
  const reloadAttempts = localStorage.getItem("reloadAttempts")
    ? Number(localStorage.getItem("reloadAttempts"))
    : 0;

  if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
    console.log("Reloading index.js");
    localStorage.setItem("reloadAttempts", String(reloadAttempts + 1));
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Wait for 1 second before reloading
  } else {
    console.error("API could not be loaded after multiple attempts");
    ReactDOM.render(
      <div>
        <h1>API could not be loaded</h1>
        <p>Please try again later.</p>
      </div>,
      document.getElementById("root")
    );
  }
}

axios.get("/api/days")
  .then((response) => {
    console.log("Make sure railway API is live", response);
    localStorage.removeItem("reloadAttempts");
    ReactDOM.render(<Application />, document.getElementById("root"));
  })
  .catch((error) => {
    console.error("API call failed:", error);
    reloadIndexJs();
  });