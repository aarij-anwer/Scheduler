import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

/*
 `Form` component is used to collect student's name and interviewer selection
  Expected `props`:
    student - name of student (if editing an appointment), "" if creating a new appointment
    interviewer - id of interviewer (if editing an appointment), null if creating a new appointment
    interviewers - array of objects containing interviewer id, name and avatar
    onCancel - event handler for onClick event on the cancel button
    onSave - event handler for onClick event on the save button
*/
const Form = (props) => {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={submitHandler}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} onChange={setInterviewer} value={interviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;