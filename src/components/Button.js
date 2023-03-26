import React from "react";

import "components/Button.scss";
import classNames from "classnames";

/*
 `Button` component is used to perform CRUD functions on appointments
  Expected `props`:
    children - label of the button
    onClick - event handler for onClick event for the button
    danger - set to true if styling the button as cancel/delete
    confirm - set to true if styling the button as save/confirm
*/
export default function Button(props) {
  
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

   return <button
      className={buttonClass}
      disabled={props.disabled}
      onClick={props.onClick}
   >
      {props.children}
   </button>
}
