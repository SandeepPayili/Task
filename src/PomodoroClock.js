import React, { useState, useEffect } from 'react';

const PomodoroClock = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [limit, setLimit] = useState(2);
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
            if (isBreak) {
              setCycles(cycles + 1);
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            } else {
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
            }
            if (limit && cycles + 1 >= limit) {
              // Stop running after reaching the cycle limit
              setIsRunning(false);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, cycles, isBreak, limit]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setCycles(0);
    setIsBreak(false);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="pomodoro-clock">
      <div className="timer">
        <span>{formatTime(minutes)}</span>
        <span>:</span>
        <span>{formatTime(seconds)}</span>
      </div>
      <div className="controls">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
      </div>
      <div className="cycle">
        {limit && <p>Cycles: {cycles}/{limit}</p>}
      </div>
    </div>
  );
};

export default PomodoroClock;
