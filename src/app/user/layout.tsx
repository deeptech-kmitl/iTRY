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


  const fetchNotification = async () => {

    try {
      const response = await getNotification(undefined, { params: { userId: '01' } }); // FIXME: get auth user id
      return response;
    }
    catch (error) {
      console.error('Failed to fetch notification data:', error);
      return null;
    }
  }


  return (
    <div>
      <ITryNavBar fetchNotification={fetchNotification}/>
      <div className={`px-4 py-0 md:px-36 md:py-24 ${customClassName}`}>
        {children}
      </div>
      <ITryFooter />
    </div>
  )
}
