"use client"
import {  CirclePower, FileStack, LucideIcon, } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';





const SideNav: React.FC = () => {
  const sidenavList: SidenavItem[] = [
    {
      id: 1,
      name: 'Get Started',
      icon: CirclePower,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Previous Interviews',
      icon: FileStack,
      path: '/dashboard/previous-interview'
    }
  ];

  const { user } = useUser();

  const pathname = usePathname();

  return (
    <div className='h-screen shadow-md border'>
      <div className='p-4 pb-28'>
        {sidenavList.map((item, index) => (
          <Link href={item.path} key={index}
            className={`p-4 flex items-center gap-4 mt-10 mb-10 cursor-pointer
              hover:bg-primary hover:text-white
              rounded-full
              ${pathname === item.path && 'bg-primary text-white'}
            `}
          >
            <item.icon />
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default SideNav;