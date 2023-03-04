import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  console.log("DayListItem props", props);

  const spots = props.spots === 0;

  const listClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": spots
  });

  // let listClass = "day-list__item";
  // (props.selected) ? listClass+="--selected" : listClass+="";
  // (spots) ? listClass+="--full" : listClass+=""

  // console.log("listClass", listClass);

  const spotsText = () => {
    let answer = props.spots + " spots remaining";

    if (props.spots === 0) {
      answer = "no spots remaining";
    } else if (props.spots === 1) {
      answer = "1 spot remaining";
    }

    // console.log("answer", answer);
    return answer;
  };

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsText()}</h3>
    </li>
  );
}