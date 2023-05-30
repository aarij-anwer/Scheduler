import React from "react";

import useApplicationData from "hooks/useApplicationData";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

/*
 `Application` component is driver of the application
  Expected `props`:
    none
*/
export default function Application(props) {

  //use custom hook to separate concerns
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //get an array of appointments for state.day 
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //get an array of interviews for state.day
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const mappedAppointments = dailyAppointments.map((appointment) => {

    //get object that contains the student name (from appointment.interview.student) and an interviewer object (with id, name and avatar)
    const interview = getInterview(state, appointment.interview);

    //pass the interview object, dailyInterviews array and other variables as props to Appointment
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview} />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
