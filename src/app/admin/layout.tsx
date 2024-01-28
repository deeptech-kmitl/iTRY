import ITryNavBar from "../components/Navbar/NavBar"
import ITrySideNavBar from "../components/Navbar/SideNavBar"

export default function UserLayout({
  children,
  customClassName
}: {
  children?: React.ReactNode
  customClassName?: string
}) {
  return (
    <>
      <div className={`flex min-h-dvh	${customClassName}`}>
        <div className="w-24">
          <ITrySideNavBar />
        </div>
        <div className="h-full w-full">
          <ITryNavBar />
          <div className="px-24 pt-36">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
