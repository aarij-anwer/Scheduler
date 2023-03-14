export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

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
    console.log(answer);
    return answer;
  }
}