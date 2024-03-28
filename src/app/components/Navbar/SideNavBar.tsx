'use client'
import { faArrowLeft, faArrowRight, faBus, faFlag, faMedal, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import ITryMenuSideNav, { ITryMenuSideNavProps } from './MenuSideNavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ITryButton from '../Button';


export default function ITrySideNavBar() {

   const [isSideNavVisible, setIsSideNavVisible] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

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
      <div className={`z-[2] absolute bg-side-navbar text-white py-12 h-full ${isSideNavVisible ? "w-24" : "w-0"} transition-all duration-300`}>
        <span>
          <h1 className={`text-2xl font-bold text-center ${isSideNavVisible ? "opacity-1" : "opacity-0"}`}>iTRY</h1>
          <ul className="flex flex-col align-center items-center mt-8 relative">
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={toggleSideNav}>
              <ITryButton customClassName='btn-circle bg-white hover:bg-white text-black border-none lg:hidden block'>
                <FontAwesomeIcon icon={isSideNavVisible ? faArrowLeft : faArrowRight} />
              </ITryButton>
            </div>
            {sideNavBarMenu.map((sideNavBarMenu, index) => (
              <span key={index} className={`h-full w-full ${isSideNavVisible ? "opacity-1" : "opacity-0"}`}>
                <ITryMenuSideNav {...sideNavBarMenu} isSideNavVisible={isSideNavVisible} />
              </span>
            ))}
          </ul>
        </span>
      </div>
      <div className={`z-[1] lg:hidden block fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 cursor-pointer ${isSideNavVisible ? 'block' : 'hidden'}`} onClick={toggleSideNav}>
      </div>
    </>
  );
}