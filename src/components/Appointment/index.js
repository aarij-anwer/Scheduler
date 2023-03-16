import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  console.log("Appointment props", props);

  //name is the name of the student
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  }

  const cancelInterview = (id) => {

    transition(DELETING);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      });
  };

  let initial = EMPTY;

  if (props.interview) {
    initial = SHOW;
  }

  const { mode, transition, back } = useVisualMode(initial);

  const interviewers = props.interviewers;

  return (
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={cancelInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save} />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"} />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"} />
      )}
    </Fragment>
  );
};

export default Appointment;