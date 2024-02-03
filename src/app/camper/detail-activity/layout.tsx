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
        <div className={`px-36 py-12 ${customClassName}`}>
            {children}
        </div>
        </div>
    )
}
