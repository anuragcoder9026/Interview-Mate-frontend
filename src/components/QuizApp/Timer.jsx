import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer" style={{
      float: 'left',
      fontSize: 'calc(100vmin - 97vmin)',
      color: 'var(--color-medium)',
      border: '2px solid var(--color-dark)',
      padding: '1.35rem 2.8rem',
      borderRadius: '100px',
      marginLeft: '-2rem',
    }}>
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
