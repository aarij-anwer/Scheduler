import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

/*
 `DayListItme` component is used to list an individual day of the week and spots remaining
  Expected `props`:
    name - name of day of the week 
    selected - true if the day was selected by the user 
    spots - number of spots available for the day
    setDay - event handler for onClick event on the day list to select the day
*/
export default function DayListItem(props) {

  const spots = props.spots === 0;

  const listClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": spots
  });

  //returns the correct text for the number of remaining spots
  const spotsText = () => {
    let answer = props.spots + " spots remaining";

    if (props.spots === 0) {
      answer = "no spots remaining";
    } else if (props.spots === 1) {
      answer = "1 spot remaining";
    }

    return answer;
  };

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{spotsText()}</h3>
    </li>
  );
}