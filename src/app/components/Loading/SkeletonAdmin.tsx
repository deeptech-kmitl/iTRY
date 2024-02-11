export default function SkeletonAdmin() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="skeleton h-16 w-64 self-center" />
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>

  )
}