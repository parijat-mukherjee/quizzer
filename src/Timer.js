import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining - mins * 60;

  useEffect(() => {
    const timerID = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);
    return () => clearInterval(timerID);
  }, [dispatch]);

  return <div className=" btn timer">{`${mins}:${secs}`}</div>;
}
