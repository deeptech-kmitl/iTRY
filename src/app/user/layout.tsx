import ITryNavBar from "../components/Navbar/NavBar"
import ITreFooter from "../components/Footer/footer"

export default function UserLayout({
  children,
  customClassName
}: {
  children?: React.ReactNode
  customClassName?: string
}) {
  return (
    <div className="font-prompt">
      <ITryNavBar />
      <div className={`px-4 py-12 md:px-36 md:py-24 ${customClassName}`}>
        {children}
      </div>
      <ITreFooter/>
    </div>
  )
}
