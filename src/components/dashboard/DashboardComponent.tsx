import React from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

interface UserProps {
  name:string;
  email:string;
  image?:undefined
}
const DashboardComponent = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session) {
    return redirect('/login');
  }
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}

export default DashboardComponent