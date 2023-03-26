import React from "react";

/*
 `Show` component is used to display a booked appointment
  Expected `props`:
    id - appointment id
    student - name of student 
    interviewer - object containing interviewer id, name and avatar
    onDelete - event handler for onClick event on the delete image
    onEdit - event handler for onClick event on the edit image
*/
const Show = (props) => {
  return (<main className="appointment__card appointment__card--show">
    <section className="appointment__card-left">
      <h2 className="text--regular">{props.student}</h2>
      <section className="interviewer">
        <h4 className="text--light">Interviewer</h4>
        <h3 className="text--regular">{props.interviewer.name}</h3>
      </section>
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <img
          className="appointment__actions-button"
          src="images/edit.png"
          alt="Edit"
          onClick={props.onEdit}
        />
        <img
          className="appointment__actions-button"
          src="images/trash.png"
          alt="Delete"
          onClick={props.onDelete}
        />
      </section>
    </section>
  </main>);
}

export default Show;