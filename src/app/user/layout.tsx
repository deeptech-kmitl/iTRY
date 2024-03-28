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
      <div className={`px-6 py-16 md:px-16 lg:px-48 xl:px-96 md:py-24 ${customClassName}`}>
        {children}
      </div>
      <ITryFooter />
    </div>
  )
}
