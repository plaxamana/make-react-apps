import React, { useState, useRef } from 'react';
import useSound from 'use-sound';
import analogAlarmSonud  from './analog_alarm.wav';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

export default function App() {
  const initialTime = 10;

  const [title, setTitle] = useState('Let the countdown begin!');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [playAlarm] = useSound(analogAlarmSonud, { volume: 0.25 });
  const intervalRef = useRef(null);

  function startTimer() {
    // don't set another time if timer is active
    if (intervalRef.current !== null) return;
    
    setTitle(`You're doing great!`);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        playAlarm();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current === null) return;

    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Keep it up!');
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTitle('Ready for another round?');
    setTimeLeft(initialTime);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {timeLeft < initialTime && (
          <button onClick={resetTimer}>Reset</button>
        )}
      </div>
    </div>
  );
}
