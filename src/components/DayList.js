import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  
  console.log("DayList props", props);

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