import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {

  console.log("InterviewerList props", props);

  const mappedInterviewers = props.interviewers.map(interviewer =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={((props.interviewer === interviewer.id))}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{mappedInterviewers}</ul>
    </section>
  );
};

export default InterviewerList;