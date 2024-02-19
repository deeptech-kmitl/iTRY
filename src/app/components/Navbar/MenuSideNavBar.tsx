'use client'
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export interface ITryMenuSideNavProps {
  title: string
  icon: IconDefinition
  path: string
}

export default function ITryMenuSideNav({
  title,
  icon,
  path
}: ITryMenuSideNavProps) {
  
  const pathname = usePathname()

  const activeMenu = () => {
    return "bg-white "
  }

  return (
    <Link href={path} className={`flex flex-col gap-1 items-center text-black hover:bg-white w-full h-full py-4 cursor-pointer duration-200 ${pathname.startsWith(path) && activeMenu()}`} shallow>
      <FontAwesomeIcon icon={icon} className="h-8 w-8" />
      <p className="text-xs font-bold">{title}</p>
    </Link>
  )
}