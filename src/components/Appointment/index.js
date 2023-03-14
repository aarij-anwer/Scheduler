import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  console.log("Appointment props", props);

  let initial = EMPTY;

  if (props.interview) {
    initial = SHOW;
  }

  const { mode, transition, back } = useVisualMode(initial);

  const interviewers = [];

  return (
    <Fragment>
      <Header time={props.time} />
      {/* {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {!props.interview && <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back}/>
      )}
    </Fragment>
  );
};

export default Appointment;