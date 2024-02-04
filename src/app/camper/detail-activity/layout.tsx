import ITryNavBar from "../../components/Navbar/NavBar"

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
        <div className={`px-6 py-2 md:px-36 md:py-12 ${customClassName}`}>
            {children}
        </div>
        </div>
    )
}
