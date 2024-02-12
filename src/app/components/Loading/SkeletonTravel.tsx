export default function SkeletonTravel() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="skeleton h-16 w-64 self-center" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mt-8">
        <div className="flex flex-col gap-4 h-64">
          <div className="skeleton h-full w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
        <div className="flex flex-col gap-4 h-64">
          <div className="skeleton h-full w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
        <div className="flex flex-col gap-4 h-64">
          <div className="skeleton h-full w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
        <div className="flex flex-col gap-4 h-64">
          <div className="skeleton h-full w-full" />
          <div className="skeleton h-12 w-full" />
        </div>
      </div>
    </div>

  )
}