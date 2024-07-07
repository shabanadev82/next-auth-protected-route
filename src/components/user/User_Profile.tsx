'use client';
import React from 'react';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const User_Profile = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;

  const { name, email, image } = user;

  const userImage = image || '';
  const getFirstLetter = email ? email.charAt(0).toUpperCase() : '';
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='p-5 shadow-md rounded-md'>
        <h1>User Details</h1>
        <div className="my-2 flex">
          <div>
            {userImage?
            <Image
              src={userImage}
              alt="user-image"
              height={40} 
              width={40}             
              className="inline-block rounded-full"
            />
            :
            <div className="w-12 h-12 rounded-full bg-green-400 flex justify-center items-center text-white text-lg font-bold">
                {getFirstLetter}
            </div>
            }
          </div>
          <div className="ml-3">
            <h1>{name}</h1>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User_Profile;