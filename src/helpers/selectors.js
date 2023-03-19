//returns an array of appointments for that day, or an empty array if there are no appointments
export function getAppointmentsForDay(state, day) {

  let answer;

  state.days.forEach((element) => {
    if (element.name === day) {
      answer = element;
    }
  });

  const returnVal = [];
  if (answer) {
    answer.appointments.forEach((element) => {
      returnVal.push(state.appointments[element]);
    });
  }

  return returnVal;
}

//returns an object that contains the student name (from `interview.student`) and an interviewer object, null if interview doesn't exist
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  } else {
    const interviewerID = interview.interviewer;
    const interviwerInfo = state.interviewers[interviewerID];
    const answer = {
      student: interview.student,
      interviewer: { ...interviwerInfo }
    }
    return answer;
  }
}

//returns an array of interviews for that day, or an empty array if there are no interviews
export function getInterviewersForDay(state, day) {

  let answer;

  state.days.forEach((element) => {
    if (element.name === day) {
      answer = element;
    }
  });

  const returnVal = [];
  if (answer) {
    answer.interviewers.forEach((element) => {
      returnVal.push(state.interviewers[element]);
    });
  }

  return returnVal;
}