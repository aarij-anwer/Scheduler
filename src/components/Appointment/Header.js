import React from "react";

/*
 `Header` component is used to display appointment times
  Expected `props`:
    time - time of the appointment
*/
const Header = (props) => {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
    );
};

export default Header;