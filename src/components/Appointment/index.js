import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

/*
 `Appointment` component is used to perform CRUD functions on appointments
  Expected `props`:
    id - appointment id
    interview - object containing student name and an interviewer object containing interviewer id, name and avatar, null if no appointment is booked
    student - name of student 
    interviewers - array of interviewer objects containing interviewer id, name and avatar
    time - time slot for the appointment
    cancelInterview - event handler for onClick event on the delete image
    bookInterview - event handler for onClick event on the save button
*/
const Appointment = (props) => {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //name is the name of the student
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    //once the Promise is resolved, transition to SHOW, otherwise transition to ERROR_SAVE, replacing the history
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
  }

  //transition to DELETING state first, then once the Promise is resolved, transition to EMPTY, otherwise transition to ERROR_DELETE, replacing the history
  const cancelInterview = (id) => {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  };

  const edit = (id) => {
    transition(EDIT);
  }

  const confirm = () => {
    transition(CONFIRM);
  }

  let initial = EMPTY;

  //appointment is booked
  if (props.interview) {
    initial = SHOW;
  }

  const { mode, transition, back } = useVisualMode(initial);

  const interviewers = props.interviewers;

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
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
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancelInterview}
          id={props.id}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"There was an error saving"}
          onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"There was an error delete"}
          onClose={back} />
      )}
    </article>
  );
};

export default Appointment;