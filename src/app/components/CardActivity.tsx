"use client";

export const CardActivity = (props: any) => {

  return (
    <div>
        <div className="w-50 bg-slate-900 border-solid cursor-pointer rounded-md place-content-center mb-5 shadow shadow-neonBlue">
          <div className="card card-side mb-5 bg-slate-900 shadow-xl">
              <img
                className="w-3/6 h-auto"
                src={props.image}
                alt={props.image}
              />
            <div className="card-body">
              <h2 className="card-title text-2xl">{props.name}</h2>
              <p className="text-base text-stone-400">{props.description}</p>
              <p className="text-cyan-400">รับสมัคร : {props.date}</p>
              <a className="text-bold text-cyan-400 text-right text-sm">
                Read More
              </a>
            </div>
          </div>
        </div>
    </div>
  );
};


