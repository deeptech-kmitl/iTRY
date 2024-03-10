import { useEffect, useState } from "react";

interface ITryCounDownProps extends CustomSpanProps {
  openDate: string,
  activityName: string;
}

interface CustomStyle {
  '--value'?: string;
  // Add other custom properties if needed
}

interface CustomSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  style?: React.CSSProperties & CustomStyle;
}

export default function ITryCounDown({ openDate, style, activityName }: ITryCounDownProps) {

  const targetDate = new Date(openDate);
  const currentDate = new Date();
  console.log("targetDate", targetDate)
  console.log("currentDate", currentDate)
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const [days, setDays] = useState(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
  const [hours, setHours] = useState(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const [minutes, setMinutes] = useState(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
  const [seconds, setSeconds] = useState(Math.floor((timeDifference % (1000 * 60)) / 1000));
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);

      if (seconds === 1) {
        setMinutes(prevMinutes => prevMinutes - 1);
        setSeconds(59);
      }

      if (minutes === 1) {
        setHours(prevHours => prevHours - 1);
        setMinutes(59);
      }

      if (hours === 1) {
        setDays(prevDays => prevDays - 1);
        setHours(23);
      }
      if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [days, hours, minutes, seconds]);

  return (
    <>
      <div className="text-center py-10">
        <span className="md:text-2xl text-base font-bold">{activityName}</span>
        <span className="md:text-2xl text-base font-bold"> is Coming</span>
      </div>
      <div className="justify-center mb-16 grid grid-flow-col md:gap-5 gap-1 text-center auto-cols-max md:text-2xl text-base">
        <div className="flex flex-col md:px-8 px-2 items-center">
          <span className="countdown font-mono">
            <span style={{ "--value": `${days}`, ...style }}>{days}</span>
          </span>
          days
        </div>
        <div className="flex flex-col md:px-8 px-2 items-center">
          <span className="countdown font-mono">
            <span style={{ "--value": `${hours}`, ...style }}>{hours}</span>
          </span>
          hours
        </div>
        <div className="flex flex-col md:px-8 px-2 items-center">
          <span className="countdown font-mono">
            <span style={{ "--value": `${minutes}`, ...style }}>{minutes}</span>
          </span>
          minutes
        </div>
        <div className="flex flex-col pmd:x-8 px-2 items-center">
          <span className="countdown font-mono">
            <span style={{ "--value": `${seconds}`, ...style }}>{seconds}</span>
          </span>
          seconds
        </div>

      </div>
    </>
  )

}