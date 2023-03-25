import React from "react";

/* 
  `Error` component is used when displaying an error message
  Expected `props`:
    message - message displayed in the component
    onClose - event handler for onClick event on the image
*/
const Error = (props) => {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
};

export default Error;