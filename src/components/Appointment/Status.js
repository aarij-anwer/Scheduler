import React from "react";

/* 
  `Status` component is used when displaying loading message
  Expected `props`:
    message - message displayed in the component
*/
const Status = (props) => {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
};

export default Status;