import { ScheduleActivity } from "@/app/utils/ManageActivityPage/activity"
import { convertDateToThai } from "@/app/utils/convertDateToThai"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleDot } from "@fortawesome/free-regular-svg-icons";

interface TimelineProps {
    schedule: ScheduleActivity[]
}

export default function Timeline({ schedule }: TimelineProps) {


    return (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {schedule.map((data, index) => {
                const passSchedule = new Date() >= new Date(data.date)
                return (
                    <li key={index}>
                        <div className="timeline-middle">
                            <FontAwesomeIcon icon={passSchedule ? faCircleCheck : faCircleDot} className={passSchedule ? "text-neonBlue" : "text-gray-800"}  />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg> */}
                        </div>
                        <div className={`w-fit px-4 inline-block timeline-end ${index % 2 === 1 ? "md:text-end md:timeline-start" : ""}`}>
                            <time>{convertDateToThai(data.date)}</time>
                            <div className="text-neonBlue">{data.title}</div>
                            <div className="px-8 w-fit timeline-end timeline-box mx-0 text-xs md:text-sm">
                                <p>{data.details}</p>
                            </div>
                        </div>
                        <hr className={` ${passSchedule ? 'bg-neonBlue' : 'bg-gray-800'}`} />
                    </li>
                )
            })}
        </ul>
    )
} 