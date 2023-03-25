import React from "react";

/* 
  `Empty` component is used when displaying an empty interview slot
  Expected `props`:
    onAdd - event handler for onClick event on the image
*/
const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;