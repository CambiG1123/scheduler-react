import { React, useState, useEffect } from "react";
import moment from "moment/moment";
import dayjs from "dayjs";
import { FaRegSave } from "react-icons/fa";

const timeBlock = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];
const TimeBlock = () => {
  const [currentTime, setCurrentTime] = useState(dayjs().hour());
  const [userInputs, setUserInputs] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().hour());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  const handleSave = (timeBlockId) => {
    if (timeBlockId !== undefined) {
      const inputValue = userInputs[timeBlockId] || '';
      localStorage.setItem(timeBlockId, inputValue);
    }
  };

  useEffect(() => {
    // Load stored input values on component mount
    const storedInputs = {};
    console.log(storedInputs)
    timeBlock.forEach((time) => {
      const timeIn24hrFormat = moment(time, 'h:mm A').format('HH');
      const storedInput = localStorage.getItem(timeIn24hrFormat);

      if (storedInput === "[object Object]") {
        storedInputs[timeIn24hrFormat] = ''
      }else{
      storedInputs[timeIn24hrFormat] = storedInput;
      }
    });

    setUserInputs(storedInputs);
  }, []);

  const handleInputChange = (timeBlockId, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [timeBlockId]: value,
    }));
  };

  const renderTimeBlock = () => {
    return timeBlock.map((time) => {
      const timeIn24hrFormat = moment(time, "h:mm A").format("HH");

      const blockMoment = moment(timeIn24hrFormat, "HH");
      const blockMomentId = blockMoment._i;

      let backgroundColor = "";
      if (blockMomentId < currentTime) {
        backgroundColor = "gray";
      } else if (blockMomentId > currentTime) {
        backgroundColor = "red";
      } else if (blockMomentId == currentTime) {
        backgroundColor = "green";
      }

      return (
        <div
          id={timeIn24hrFormat}
          key={timeIn24hrFormat}
          className="row time-block present"
        >
          <div className="col-2 col-md-1 hour text-center py-3">{time}</div>
          <textarea
            style={{ backgroundColor }}
            className="col-8 col-md-10 description"
            rows="3"
            value={userInputs[timeIn24hrFormat] || ''}
            onChange={(e) => handleInputChange(timeIn24hrFormat, e.target.value)}
          />
          
          <button
            onClick={() => handleSave(timeIn24hrFormat)}
            className="bg-cyan-300 flex items-center justify-center col-2 col-md-1"
            aria-label="save"
          >
            <FaRegSave
              size={40}
              className="hover:scale-110 ease-in duration-200"
            />
          </button>
        </div>
      );
    });
  };

  return <div>{renderTimeBlock()}</div>;
};

export default TimeBlock;
