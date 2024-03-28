import { ScheduleActivity } from "@/app/utils/ManageActivityPage/activity"
import { convertDateToThai } from "@/app/utils/convertDateToThai"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { convertDateToString } from "@/app/utils/converDateToString";

interface TimelineProps {
    schedule: ScheduleActivity[]
}

export default function Timeline({ schedule }: TimelineProps) {

    const currentDate = new Date();
    const convertDate = convertDateToString(currentDate);

    const alreadyFinish = convertDate >= schedule.slice(-1)[0].date


    return (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {schedule.map((data, index) => {
                console.log("timelineDate", convertDate, data.date)
                const passSchedule = convertDate >= data.date
                return (
                    <li key={index}>
                        <div className="timeline-middle">
                            <FontAwesomeIcon icon={passSchedule ? faCircleCheck : faCircleDot} className={passSchedule ? "text-neonBlue" : "text-gray-800"}  />
                        </div>
                        <div className={`w-fit px-4 inline-block timeline-end ${index % 2 === 1 ? "md:text-end md:timeline-start" : ""}`}>
                            <time>{convertDateToThai(data.date)}</time>
                            <div className="text-neonBlue">{data.title}</div>
                            <div className="px-8 w-fit timeline-end timeline-box mx-0 text-xs md:text-sm inline-block" style={{wordBreak: "break-word"}}>
                                <p>{data.details}</p>
                            </div>
                        </div>
                        <hr className={` ${passSchedule ? 'bg-neonBlue' : 'bg-gray-800'}`} />
                    </li>
                )
            })}
            <li>
                <div className="timeline-middle">
                    <FontAwesomeIcon icon={alreadyFinish ? faCircleCheck : faCircleDot} className={alreadyFinish ? "text-neonBlue" : "text-gray-800"} />
                </div>
                <div className={`w-fit px-4 inline-block timeline-end ${schedule.length % 2 === 1 ? "md:text-end md:timeline-start" : ""}`}>
                    <time>กิจกรรมสิ้นสุดแล้ว</time>
                </div>
            </li>
        </ul>
    )
} 