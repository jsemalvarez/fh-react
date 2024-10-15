'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props{
    path: string;
    icon: React.ReactNode;
    name: string;
}

export const SidebarItem = ( { path, icon, name }:Props ) => {

  const pathName = usePathname();
  return (
    <li>
        <Link href={ path } className={`
          px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
          ${ path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
        `}>
            { icon }
            <span className="-mr-1 font-medium">{ name }</span>
        </Link>
    </li>
  )
}
