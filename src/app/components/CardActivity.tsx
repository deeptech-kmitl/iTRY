

interface CardActivityProps {
  dataApi: ascActivityApi | { error: unknown; status: "error" } | undefined;
}
export interface ascActivityApi {
  data: ActivityData[];
  // status: "success"
}

export interface ActivityData {}

export const CardActivity = async (props: any) => {
  console.log("props------", props);
  const item = props.item

  return (
    <div>
        <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
          <div className="card card-side mb-5 bg-slate-900 shadow-xl">
            <img
              className="w-3/6 h-auto"
              src={item.imageUrl}
            />
            <div className="card-body">
              <h2 className="card-title text-2xl">{item.activityName}</h2>
              <p className="text-base text-stone-400">{item.activityDetails}</p>
              <p className="text-cyan-400">
                รับสมัคร : {item.openDate} - {item.closeDate}
              </p>
              <a className="text-bold text-cyan-400 text-right text-sm">
                Read More
              </a>
            </div>
          </div>
        </div>
    </div>
  );
};
