import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

/*
 `InterviewerList` component is used to list the available interviewers for a slot
  Expected `props`:
    interviewers - array of interviewer objects (id, name, avatar)
    value - null in CREATE mode, id during CREATE when selected or EDIT
    selected - true if the interviewer was selected in `InterviewerList` 
    onChange - event handler for onClick event on the interviewer
*/
const InterviewerList = (props) => {

  const mappedInterviewers = props.interviewers.map(interviewer => {

    //workaround necessary to show the interviewer in CREATE and EDIT modes
    //props.value is null in CREATE
    //props.value has interviewer's ID during CREATE when selected or when selecting a different interviewer during EDIT
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

//for testing
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;