"use client"

import Image from 'next/image';

import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '../ui/button';

const Header = () => {
const {user,isSignedIn} = useUser();
  return (
    <div className='p-5 border-b shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <Link href={'/'} className='cursor-pointer'>
             <Image src='/logo.png' alt='logo' width={80} height={50} />
              <p className='text-primary text-xl font-bold hidden sm:block'>InterviewMentor AI</p>
          </Link>
        </div>
        
        {isSignedIn?
        <div className='flex items-center gap-5'>
          <Link href={'/dashboard'}>
          <Button variant='outline'>Dashboard</Button>
         </Link>
          <UserButton/></div>
        : <SignInButton>
          <Button>Login</Button>
        </SignInButton>
        }
    
      </div>
    </div>
  );
};

export default Header;