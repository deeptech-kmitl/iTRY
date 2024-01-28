import { faBus, faFlag, faMedal, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import ITryMenuSideNav, { ITryMenuSideNavProps } from './MenuSideNavBar';


export default function ITrySideNavBar() {

  const sideNavBarMenu: ITryMenuSideNavProps[] = [
    {
      title: "Activity",
      icon: faNewspaper,
      path: "/admin/activity"
    },
    {
      title: "Banner",
      icon: faFlag,
      path: "/admin/banner"
    },
    {
      title: "Travel",
      icon: faBus,
      path: "/admin/travel"
    },
    {
      title: "Sponsor",
      icon: faMedal,
      path: "/admin/sponsor"
    },
  ]

  return (
    <>
      <div className="bg-side-navbar text-white py-12 h-full w-full">
        <h1 className="text-2xl font-bold text-center">iTRY</h1>
        <ul className="flex flex-col align-center items-center mt-8">
          {sideNavBarMenu.map((sideNavBarMenu, index) => (
            <ITryMenuSideNav key={index} {...sideNavBarMenu} />
          ))}
        </ul>
      </div>
    </>
  )
}