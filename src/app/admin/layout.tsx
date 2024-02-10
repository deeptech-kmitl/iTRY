import ITryFooter from "../components/Footer/footer"
import ITryFooterr from "../components/Footer/footer"
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
          <div className="px-12 py-16 xl:px-24 xl:py-36">
            {children}
          </div>
        </div>
      </div>

      <ITryFooter />
    </>
  )
}
