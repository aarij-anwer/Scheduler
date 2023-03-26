import { useState } from "react"; 

//Custom hook `useVisualMode` will be responsible for setting and maintaining the mode and history of mode for the application. The mode is used to determine what is shown to the user and the history enables the back/cancel functionality.
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  //sets mode to `newMode` and adds it to history. Deletes the previous mode from the history if `replace = true`
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (!replace) {
      setHistory((prev) => {
        return([...prev, newMode])
      });
    } else {
      setHistory((prev) => {
        prev.pop();
        return([...prev, newMode])
      });
    }
  };

  //moves back through the history array, stopping at the initial mode
  const back = () => {
    if (mode !== initial) {
      setMode(history[history.length-2]);
      setHistory((prev) => {
        prev.pop();
        return [...prev];
      });
    }
  };
  
  return { mode, transition, back };
};

export default useVisualMode;