import React, { useState } from "react";

const InterviewerListItem = (props) => {
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );

};

export default InterviewerListItem;