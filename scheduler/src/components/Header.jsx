import { React, useState, useEffect } from 'react';
import moment from 'moment/moment';
import dayjs from 'dayjs';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('h:mm A'));
  const [currentDay, setCurrentDay] = useState(moment().format('dddd' + ', ' + 'MMMM Do'));

  useEffect(() => {
    // Check if the stored day is different from the current day
    const storedDay = localStorage.getItem('currentDay');
    if (storedDay !== currentDay) {
      // Clear local storage if the day has changed
      localStorage.clear();
      // Update the stored day with the current day
      localStorage.setItem('currentDay', currentDay);
    }

    const intervalId = setInterval(() => {
      setCurrentDay(moment().format('dddd' + ', ' + 'MMMM Do'));
      setCurrentTime(dayjs().format('h:mm A'));
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentTime, currentDay]);

  const handleClear = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className='container mx-auto flex flex-col items-center'>
      <h1 className='text-center mb-2 text-decoration underline font-bold text-lg'>My Daily Schedule</h1>
      <div className='flex-grow text-center px-4 py-2 m-2'>
        {currentDay} <br></br>
        {currentTime}
      </div>
      <div className='items-start'>
        <button className='bg-cyan-300  text-white font-bold py-2 px-4 rounded hover:scale-105 ease-in duration-200' onClick={handleClear}>
          Clear Schedule
        </button>
      </div>
    </div>
  );
};

export default Header;
