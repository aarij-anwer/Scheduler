import React, {useState, useEffect} from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //id is the appointment id
  function bookInterview(id, interview) {
    console.log("bookInterview", id, interview);

    //get existing appointment object, replace interview with paramater
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //get existing appointments, replace appointments[id] 
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
  
  return {state, setDay, bookInterview, cancelInterview};
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