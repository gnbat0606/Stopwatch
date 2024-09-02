"use client";

import { useEffect, useState } from "react";

export const WithUseEffect = () => {
  const [timer, setTimer] = useState({
    time: 0,
    minutes: 0,
    second: 0,
    milliseconds: 0,
  });

  const [start, setStart] = useState(false);

  useEffect(() => {
    let inter;
    if (start) {
      inter = setInterval(() => {
        setTimer((prev) => {
          let seconds = prev.second;
          let milliseconds = prev.milliseconds;
          let minute = prev.minutes;
          let time = prev.time;
          milliseconds++;

          if (milliseconds === 100) {
            seconds++;
            milliseconds = 0;
          }
          if (seconds === 60) {
            minute++;
            seconds = 0;
          }
          if (minute === 60) {
            time++;
            minute = 0;
          }
          return {
            second: seconds,
            time: time,
            milliseconds: milliseconds,
            minutes: minute,
          };
        });
      }, 10);
    }
    return () => {
      clearInterval(inter);
    };
  }, [start]);

  const resetHandler = () => {
    setStart(false);
    setTimer({
      time: 0,
      minutes: 0,
      second: 0,
      milliseconds: 0,
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center mt-64">
      <div id="timerNumber">
        {timer.time} {timer.minute} {timer.second} {timer.milliseconds}
      </div>
      <div className="flex gap-4">
        <button className="btn" onClick={() => setStart(true)}>
          Start
        </button>
        <button className="btn" onClick={() => setStart(false)}>
          Stop
        </button>
        <button className="btn" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </div>
  );
};
