import Link from "next/link";
import useUserController from "./useUserController";
import { usePathname } from "next/navigation";

interface MenuTabNavProps {
  title: string;
  path: string;
  show: boolean;
  activeTabName: string[];
}

export default function TabNavBar() {

  const { userData, isLogin } = useUserController();

  const menuTabNav: MenuTabNavProps[] = [
    {
      title: "Home",
      path: "/",
      show: true,
      activeTabName: ["/"]
    },
    {
      title: "Staff",
      path: "/staff",
      show: true,
      activeTabName: ["/staff"]
    },
    {
      title: "Admin",
      path: "/admin/activity",
      show: userData.role === "admin" && isLogin,
      activeTabName: ["/admin"]
    },
  ]

  const activeTabMenuClassName = () => {
    return "text-primary-color"
  }

  const pathname = usePathname()

  const getActiveTabMenu = (activeTabName: string[]) => {
    if (activeTabName.includes(pathname) || (activeTabName.includes("/admin") && pathname.startsWith("/admin"))) {
      return activeTabMenuClassName()
    }
  }


  return (
    <>
      <ul className="flex-grow flex justify-center border gap-6 md:gap-12 md:px-12 px-6 md:py-4 py-3 mr-6 nd:mr-0 rounded-full border-color-primary" >
        {menuTabNav.map((menu, index) => {
          return <>
            {menu.show && (
              <Link key={index} href={menu.path}>
                <p className={getActiveTabMenu(menu.activeTabName)}>{menu.title}</p>
              </Link >
            )}
          </>
        })}
      </ul >
    </>
  )
}