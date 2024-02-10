export default function SkeletonActivity() {
  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="skeleton h-16 w-64 self-center" />
      <div className="skeleton h-12 w-96 self-center" />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="skeleton w-24 h-8" />
            <div className="skeleton w-16 h-8" />
          </div>
          <div className="skeleton w-32 h-8" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex h-96">
            <div className="skeleton h-full w-full bg-opacity-80 rounded-none	p-4">
              <div className="skeleton h-full w-full rounded-none	" />
            </div>
            <div className="relative p-8 h-full w-full flex flex-col gap-4 skeleton bg-opacity-80 rounded-none	" >
              <div className="skeleton h-12 w-36" />
              <div className="skeleton w-full">
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-8 w-full" />
              </div>
              <div className="skeleton h-8 w-full" />
              <div className="absolute bottom-0 right-0 p-8">
                <div className="flex gap-4">
                  <div className="skeleton h-12 w-24" />
                  <div className="skeleton h-12 w-16" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-96">
            <div className="skeleton h-full w-full bg-opacity-80 rounded-none	p-4">
              <div className="skeleton h-full w-full rounded-none	" />
            </div>
            <div className="relative p-8 h-full w-full flex flex-col gap-4 skeleton bg-opacity-80 rounded-none	" >
              <div className="skeleton h-12 w-36" />
              <div className="skeleton w-full">
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-8 w-full" />
                <div className="skeleton h-8 w-full" />
              </div>
              <div className="skeleton h-8 w-full" />
              <div className="absolute bottom-0 right-0 p-8">
                <div className="flex gap-4">
                  <div className="skeleton h-12 w-24" />
                  <div className="skeleton h-12 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}