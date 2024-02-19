import { getNotification } from "../api/notification/[userId]/route"
import ITryFooter from "../components/Footer/footer"
import ITryNavBar from "../components/Navbar/NavBar"
import { NotificationProp, Notification } from '@/app/utils/ManageEmail/email';

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
      <div className={`px-8 py-0 md:px-16 lg:px-48 xl:px-96 md:py-24 ${customClassName}`}>
        {children}
      </div>
      <ITryFooter />
    </div>
  )
}
