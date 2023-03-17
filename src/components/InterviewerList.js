import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {

  console.log("InterviewerList props", props);
  
  const mappedInterviewers = props.interviewers.map(interviewer => {

    //workaround necessary to show the interviewer in CREATE and EDIT modes
    //props.value is null in CREATE
    //props.value has interviewer's ID during CREATE or when selecting a different interviewer during EDIT
    //props.value has `interviewer` object during EDIT
    const selected = (props.value) && ((props.value === interviewer.id) || (props.value.id === interviewer.id));

    return (<InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={selected}
      setInterviewer={(event) => props.onChange(interviewer.id)}
    />);
});

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInterviewers}</ul>
    </section>
  );
};

export default InterviewerList;