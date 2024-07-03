'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'


const Header = () => {
  const {data:session, status} = useSession();
  return (
    <header>
        <nav className='flex justify-center align-center'>
          <div className=" w-72 flex justify-around">
            <Link href='/dashboard'>Dashboard</Link>
            <Link href='/user-profile'>Profile</Link>
            {
                session ?
                <button onClick={()=>signOut()}>Sign out</button>
                 :
                <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Sign up</Link>
                </>
             } 
            </div>
        </nav>
    </header>
  )
}

export default Header