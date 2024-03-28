import ITryFooter from "../components/Footer/footer"
import ITryNavBar from "../components/Navbar/NavBar"
import ITrySideNavBar from "../components/Navbar/SideNavBar"

export default function AdminLayout({
  children,
  customClassName
}: {
  children?: React.ReactNode
  customClassName?: string
}) {
  return (
    <>
      <div className={`flex min-h-dvh relative	${customClassName}`}>
        <ITrySideNavBar />
        <div className="h-full w-full">
          <ITryNavBar />
          <div className="px-6 py-16 md:px-16 lg:px-48 xl:px-96 md:py-24">
            {children}
          </div>
        </div>
      </div>

      <ITryFooter />
    </>
  )
}
