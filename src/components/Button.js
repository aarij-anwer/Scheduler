import React from "react";

import "components/Button.scss";
import classNames from "classnames";


export default function Button(props) {

   // console.log("Button props", props);
  
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });

    console.log("buttonClass", buttonClass);

   return <button
      className={buttonClass}
      disabled={props.disabled}
      onClick={props.onClick}
   >
      {props.children}
   </button>
}
