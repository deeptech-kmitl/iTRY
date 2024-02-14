"use-client";

export const Paging = () => {
  return (
    <div className="join flex justify-center pt-5">
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        checked
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="3"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
      />{" "}
    </div>
  );
};
