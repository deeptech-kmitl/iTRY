import Link from "next/link";
import useUserController from "./useUserController";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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
      activeTabName: ["/"],
    },
    {
      title: "Staff",
      path: "/staff/activities",
      show: true,
      activeTabName: ["/staff/activities"],
    },
    {
      title: "Camper",
      path: "/camper/activities",
      show: true,
      activeTabName: ["/camper/activities"],
    },
    {
      title: "Admin",
      path: "/admin/activity",
      show: userData.role === "admin" && isLogin,
      activeTabName: ["/admin"],
    },
  ];

  const activeTabMenuClassName = () => {
    return "text-primary-color";
  };

  const pathname = usePathname();

  const getActiveTabMenu = (activeTabName: string[]) => {
    if (
      activeTabName.includes(pathname) ||
      (activeTabName.includes("/admin") && pathname.startsWith("/admin"))
    ) {
      return activeTabMenuClassName();
    }
  };

  return (
    <>
      <ul className="md:flex-grow flex md:top-0 top-100 justify-center md:border gap-3 md:gap-12 md:px-12 px-3 md:py-4 py-3 md:mr-0 rounded-full border-color-primary ">
        {menuTabNav.map((menu, index) => {
          return (
            <Fragment key={index}>
              {menu.show && (
                <Link href={menu.path} shallow>
                  <p
                    className={`${getActiveTabMenu(menu.activeTabName)} ${
                      menu.title === "Home" && "md:block hidden"
                    }`}
                  >
                    {menu.title}
                  </p>
                </Link>
              )}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}
