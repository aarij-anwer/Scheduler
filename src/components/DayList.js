import React from "react";
import DayListItem from "./DayListItem";

/*
 `DayList` component is used to list the days of the week and spots remaining
  Expected `props`:
    days - array of day objects ([appointments], id, [interviewers], name, spots) 
    value - name of day of the week 
    onChange - event handler for onClick event on the day list
*/
const DayList = (props) => {
  
  const listItems = props.days.map((item) => 
    <DayListItem 
      key={item.id}
      name={item.name}
      spots={item.spots}
      setDay={props.onChange}
      selected={item.name === props.value} />
  );

  return (
    <ul>{listItems}</ul>
  );
};

export default DayList;