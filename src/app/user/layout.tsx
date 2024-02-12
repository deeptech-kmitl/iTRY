import ITryFooter from "../components/Footer/footer"
import ITryNavBar from "../components/Navbar/NavBar"

export default function UserLayout({
  children,
  customClassName
}: {
  children?: React.ReactNode
  customClassName?: string
}) {
  return (
    <div>
      <ITryNavBar />
      <div className={`px-4 py-0 md:px-36 md:py-24 ${customClassName}`}>
        {children}
      </div>
      <ITryFooter />
    </div>
  )
}
