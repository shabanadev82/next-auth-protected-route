'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions, CustomUser } from '@/app/api/auth/[...nextauth]/options'


const Header = () => {
  const {data:session, status} = useSession();
  const user = session?.user as CustomUser;
  const role = user?.role;
  
  return (
    <header>
        <nav className='flex justify-between align-center p-4 shadow-md'>
          <div>
            <Link href='/'>LOGO</Link>
          </div>
           <div>
            {
              role == "Admin"?
              <Link href='/dashboard' className='mx-1'>Dashboard</Link>
              :
              <Link href='/user-profile' className='mx-1'>Profile</Link>
            }
           </div>
          <div className="w-auto flex justify-between">
            {
                session ?
                <button onClick={()=>signOut()} className='mx-1 px-4 py-1 shadow rounded-full bg-green-800 text-white hover:bg-green-300'>Sign out</button>
                 :
                <>
                <Link href='/admin/login' className='mx-1 px-4 py-1 shadow rounded-full bg-green-800 text-white hover:bg-green-300'>Admin Login</Link>
                <Link href='/login' className='mx-1 px-4 py-1 shadow rounded-full bg-green-800 text-white hover:bg-green-300'>Login</Link>
                <Link href='/register' className='mx-1 px-4 py-1 shadow rounded-full bg-green-800 text-white hover:bg-green-300'>Sign up</Link>
                </>
             } 
            </div>
        </nav>
    </header>
  )
}

export default Header