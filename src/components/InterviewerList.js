import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {

  console.log("InterviewerList props", props);
  
  const mappedInterviewers = props.interviewers.map(interviewer => {
    console.log("props.value", props.value);
    console.log("interviewer.id", interviewer.id);

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