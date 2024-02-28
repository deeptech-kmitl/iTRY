import { getRegisteringActivities } from "@/app/api/registeringActivities/route";
import Image from "next/image";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";
import Link from "next/link";
import NoResultData from "../NoData/NoResultData";


interface RegisteringActivityProps {
  activity: ApiDataList<ITryActivity> | ApiError | undefined
}

export default function RegisteringActivitiesContainer({ activity }: RegisteringActivityProps) {

  if (!activity) {
    return null
  }
    return (
      <div>
        {activity && 'data' in activity && activity.data.length !== 0 ? (
          <div className="bg-BlueO md:border-2 md:border-neonBlue rounded-xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
              {activity?.data.slice(0, 6).map((item: ITryActivity, key: any) => (
                <Link key={key} href={`http://localhost:3000/${item.typeActivity}/activity-details/${item.activityId}`}>
                    <div className="flex flex-col items-center p-3 md:p-5 max-w-xs rounded-xl hover:bg-navyBlue/50 backdrop-blur-[5px]">
                        <div className="items-center rounded transform transition-transform duration-300">
                            <Image
                              src={typeof item.imageUrl === 'string' ? item.imageUrl : ''}
                              alt={item.activityName}
                              width="120"
                              height="120"
                              className="object-cover w-full h-full rounded-image border-2 border-neonBlue"
                            />
                        
                            <div className="text-center pt-3">
                              <p className="text-sm md:text-ls">{item.activityName}</p>
                              <p className="text-xs md:text-base text-slate-400">
                                for {item.typeActivity}
                              </p>
                            </div>
                          </div>
                    </div>
                </Link>
              ))}
              
            </div>
        ): (
          <div className="bg-BlueO md:border-2 md:border-neonBlue rounded-xl flex justify-center items-center py-14">
            <NoResultData text="ไม่มีกิจกรรมที่กำลังเปิดรับสมัคร" />
          </div>
        )}
          
      </div>
    )
  
}