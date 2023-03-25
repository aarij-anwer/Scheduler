import React from "react";
import Button from "components/Button";

/*
 `Confirm` component is used when performing destructive actions
  Expected `props`:
    message - message displayed in the component
    onCancel - event handler for onClick event on the cancel button
    onConfirm - event handler for onClick event on the confim button
*/
const Confirm = (props) => {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={() => props.onConfirm(props.id)}>Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;