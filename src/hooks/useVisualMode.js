import { useState } from "react"; 

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

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

  const back = () => {
    if (mode !== initial) {
      setMode(history[history.length-2]);
      setHistory((prev) => {
        // let newData = prev.slice();
        // newData.pop();
        prev.pop();
        return [...prev];
      });
    }
  };
  
  console.log(history);
  return { mode, transition, back };
};

export default useVisualMode;