
export default function UserLayout({
  children,
  customClassName
}: {
  children?: React.ReactNode
  customClassName?: string
}) {
  return (
    <>
      <div className={`px-36 py-24 ${customClassName}`}>
        {children}
      </div>
    </>
  )
}
