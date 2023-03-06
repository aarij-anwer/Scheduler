import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

const Appointment = (props) => {

  console.log("Appointment props", props);

  return(
    <Fragment>
      <Header time={props.time} />
      {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}  />}
      {!props.interview && <Empty />}
    </Fragment>
  );
};

export default Appointment;