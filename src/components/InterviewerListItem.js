import React from "react";
import "components/InterviewerListItem.scss"
// import classNames from "classnames";

const InterviewerListItem = (props) => {

  console.log("InterviewerListItem props", props);

  let interviewerClass = "interviewers__item";
  (props.selected) ? interviewerClass+="--selected" : interviewerClass+="";

  // const interviewerClass = classNames("interviewers__item", {
  //   "--selected": props.selected
  // });

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