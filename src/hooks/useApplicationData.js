import React, { useState, useEffect } from "react";
import axios from "axios";

//Custom hook `useApplicationData` will be responsible for loading the initial data from the API. This hook will also provide the actions to update the state, causing the component to render.
const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //`bookInterview` takes in an the appointment id (`id`) and an `interview` object. It makes an API call to `/api/appointments/:id` to PUT the appointment. It returns a Promise with the result of the API call. 
  function bookInterview(id, interview) {
    console.log("bookInterview", id, interview);

    //get existing appointment object, replace interview with paramater
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //create a true copy of appointments object from state, replace appointments[id] with the appointment object from above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const URL = `/api/appointments/${id}`;
    console.log("URL", URL);

    //make API call, if successful update the state and return the Promise
    return axios.put(URL, appointment)
      .then((response) => {
        setState({ ...state, appointments });
        console.log("response from API call", response);
      });
  }

  //`cancelInterview` takes in an the appointment id (`id`). It makes an API call to `/api/appointments/:id` to DELETE the appointment with `id`. It returns a Promise with the result of the API call. 
  const cancelInterview = (id) => {
    console.log("cancelInterview", id);

    const URL = `/api/appointments/${id}`;

    // get appointment object from state and set its interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //create a true copy of the appointments object from state, with the updated appointment from above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //make API call, if successful update the state and return the Promise
    return axios.delete(URL)
      .then((response) => {
        setState({ ...state, appointments });
        console.log("response from API call", response);
      });
  };

  //`setDay` updates state.day 
  const setDay = day => setState({ ...state, day });

  //loading the initial data from the API
  useEffect(() => {
    const getDays = axios.get("/api/days");
    const getAppointments = axios.get("/api/appointments");
    const getInterviews = axios.get("/api/interviewers");

    const promises = [getDays, getAppointments, getInterviews];

    //when all `promises` resolve, then update the state
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

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;


// const dayIndex = returnDayIndex();
// console.log("dayIndex", dayIndex);

// const newSpots = state.days[dayIndex].spots - 1;
// console.log("newSpots", newSpots);

// const returnDayIndex = () => {
//   for (let i=0; i < state.days.length; i++) {
//     if (state.days[i].name === state.day) {
//       return i;     
//     }
//   }
// };