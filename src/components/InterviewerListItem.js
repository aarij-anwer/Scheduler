import React from "react";
import "components/InterviewerListItem.scss"

/*
`InterviewerListItem` component is used to list an interviewer in the `InterviewerList` 
Expected `props`:
    name - name of the interviewer
    avatar - URL for the avatar of the interviewer
    selected - true if the interviewer was selected in `InterviewerList` 
    setInterviewer - event handler for onClick event on the list item
*/
const InterviewerListItem = (props) => {

  let interviewerClass = "interviewers__item";
  (props.selected) ? interviewerClass+="--selected" : interviewerClass+="";

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

};

export default InterviewerListItem;