import { getRegisteringActivities } from "@/app/api/registeringActivities/route";
import Image from "next/image";
import { ITryActivity } from "@/app/utils/ManageActivityPage/activity";
import { ApiDataList, ApiError } from "../global";


interface RegisteringActivityProps {
  activity: ApiDataList<ITryActivity> | ApiError | undefined
}

export default function RegisteringActivitiesContainer({ activity }: RegisteringActivityProps) {

  if (!activity) {
    return typeof activity;
  }
  

  return (
    <div className="md:py-16">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-base md:text-2xl flex items-center">
          <p className="mr-2">กิจกรรมที่กำลังเปิดรับสมัคร</p>
        </div>
        <div className="bg-BlueO md:border-2 md:border-neonBlue rounded-xl my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
              {activity?.data.slice(0, 6).map((item, key) => (
                <div
                  key={key}
                  className="flex flex-col items-center p-3 md:p-5 max-w-xs"
                >
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
              ))}
            </div>
      </div>
    </div>
  )
}