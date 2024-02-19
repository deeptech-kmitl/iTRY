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
        <span className="text-3xl font-bold">{activityName}</span>
        <span className="text-3xl font-bold"> is Coming</span>
      </div>
      <div className="justify-center mb-16 grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col px-8 items-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": `${days}`, ...style }}>{days}</span>
          </span>
          days
        </div>
        <div className="flex flex-col px-8 items-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": `${hours}`, ...style }}>{hours}</span>
          </span>
          hours
        </div>
        <div className="flex flex-col px-8 items-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": `${minutes}`, ...style }}>{minutes}</span>
          </span>
          minutes
        </div>
        <div className="flex flex-col px-8 items-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": `${seconds}`, ...style }}>{seconds}</span>
          </span>
          seconds
        </div>

      </div>
    </>
  )

}