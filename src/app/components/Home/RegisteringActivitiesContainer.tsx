import Image from "next/image";

export default function RegisteringActivitiesContainer() {
  return (
    <div className="md:py-16">
      <div className="grid grid-cols-1 gap-4">
        <div className="text-base md:text-2xl flex items-center">
          <p className="mr-2">กิจกรรมที่กำลังเปิดรับสมัคร</p>
        </div>
        {/* <div className="bg-BlueO md:border-2 md:border-neonBlue rounded-xl my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
              {activity.slice(0, 6).map((item, key) => (
                <div
                  key={key}
                  className="flex flex-col items-center p-3 md:p-5 max-w-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width="120"
                    height="120"
                    className="object-cover w-full h-full rounded-image border-2 border-neonBlue"
                  />
                  <div className="text-center pt-3">
                    <p className="text-sm md:text-ls">{item.title}</p>
                    <p className="text-xs md:text-base text-slate-400">
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            // </div> */}
      </div>
    </div>
  )
}