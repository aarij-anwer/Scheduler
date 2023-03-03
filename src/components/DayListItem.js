import React from "react";
// import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log("DayListItem props", props);

  const spots = props.spots === 0;

  // const listClass = classNames("day-list__item", {
  //   "--selected": props.selected,
  //   "--full": spots
  // });

  let listClass = "day-list__item";
  (props.selected) ? listClass+="--selected" : listClass+="";
  (spots) ? listClass+="--full" : listClass+=""

  console.log("listClass", listClass);

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}