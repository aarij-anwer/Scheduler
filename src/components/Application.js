import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //id is the appointment id
  function bookInterview(id, interview) {
    console.log("bookInterview", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const URL = `/api/appointments/${id}`;
    console.log("URL", URL);

    return axios.put(URL, appointment)
      .then((response) => {
        setState({ ...state, appointments });
        console.log("response from API call", response);
      });
  }

  const cancelInterview = (id) => {
    console.log("cancelInterview", id);

    const URL = `/api/appointments/${id}`;

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(URL)
      .then((response) => {
        setState({ ...state, appointments });
        console.log("response from API call", response);
      });
  };

  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviews = axios.get("/api/interviewers");

    const promises = [getDays, getAppointments, getInterviews];

    Promise.all(promises)
      .then((all) => {
        console.log("days", all[0]);
        console.log("appointments", all[1]);
        console.log("interviewers", all[2]);
        setState(prev => {
          return ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
        });
      });
  }, []);

  const mappedAppointments = dailyAppointments.map((appointment) => {
    return <Appointment
      key={appointment.id}
      {...appointment}
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
      </section>
    </main>
  );
}
