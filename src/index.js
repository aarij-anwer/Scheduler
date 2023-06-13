import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import axios from "axios";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

const MAX_RELOAD_ATTEMPTS = 3;

function reloadIndexJs(num) {
  ReactDOM.render(<Status message="Establishing connection with the Railway API" />, document.getElementById("root"));
  const reloadAttempts = localStorage.getItem("reloadAttempts")
    ? Number(localStorage.getItem("reloadAttempts"))
    : num;

  if (reloadAttempts < MAX_RELOAD_ATTEMPTS) {
    console.log("Reloading index.js");
    localStorage.setItem("reloadAttempts", String(reloadAttempts + 1));
    setTimeout(() => {
      window.location.reload();
      axios.get("/api/days");
    }, 1000); // Wait for 1 second before reloading
  } else {
    console.error("API could not be loaded after multiple attempts");
    const message = "Railway API failed to load. It's very frustrating. Please close this message by clicking on the x to try again.";
    localStorage.removeItem("reloadAttempts");
    ReactDOM.render(<Error message={message} onClose={() => reloadIndexJs(0)} />, document.getElementById("root"));
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
    reloadIndexJs(0);
  });