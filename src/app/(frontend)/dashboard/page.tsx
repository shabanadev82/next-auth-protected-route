import React from 'react';
import DashboardComponent from '@/components/dashboard/DashboardComponent';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const data = session?.user
  console.log(data);
  
  if (!session) {
    return redirect('/login');
  }
  return (
    <DashboardComponent />
  );
};

export default Dashboard;
