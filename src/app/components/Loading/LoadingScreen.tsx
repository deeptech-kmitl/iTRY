export default function LoadingScreen() {
  return (
    <>
      <div className="z-10 absolute h-full w-full bg-black bg-opacity-50 flex justify-center items-center">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </>
  )
}