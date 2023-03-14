import { useState } from "react"; 

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode) => {
    setMode(newMode);
    setHistory((prev) => {
      return([...prev, newMode])
    });
  };

  const back = () => {
    if (mode !== initial) {
      setHistory((prev) => {
        let newData = prev.slice();
        newData.pop();
        return [...newData];
      });
      setMode(history[history.length-2]);
    }
  };
  
  // console.log(history);
  return { mode, transition, back };
};

export default useVisualMode;