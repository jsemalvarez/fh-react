import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5'
import { SidebarItem } from './SidebarItem'
import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'
import { LogoutButton } from './LogoutButton'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItems = [
    {
      icon: <IoCalendarOutline />,
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: <IoCheckboxOutline />,
      title: 'Rest TODOS',
      path: '/dashboard/rest-todos'
    },
    {
      icon: <IoListOutline />,
      title: 'Server Actions',
      path: '/dashboard/server-todos'
    },
    {
      icon: <IoCodeWorkingOutline />,
      title: 'Cookies',
      path: '/dashboard/cookies'
    },
    {
      icon: <IoCodeWorkingOutline />,
      title: 'Products',
      path: '/dashboard/products'
    },
    {
      icon: <IoPersonOutline />,
      title: 'perfil',
      path: '/dashboard/profile'
    },
  ]

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);

  // if(!session){
  //     redirect('/api/auth/signin')
  // }

  console.log('session on Sidebar')
  console.log(session)


  const userName = session?.user?.name || 'Cynthia J. Watts';
  const img = session?.user?.image || "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";

  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <div>
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    <Link href="#" title="home">
                        <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={150} height={150} className="w-32" alt="tailus logo"/>
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image src={ img } width={150} height={150} alt="user" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{ userName }</h5>
                    <span className="hidden text-gray-400 lg:block">
                      { userRoles }
                    </span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {
                        menuItems.map( ({path, icon, title }) => (
                            <SidebarItem key={path} path={path} icon={icon} name={title}                                
                            />
                        ))
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <LogoutButton />
            </div>
        </aside>
    </div>
  )
}
