"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CustomUser } from '@/app/api/auth/[...nextauth]/options';
import axios from 'axios';
import TextError from '../forms/TextError';

const DashboardComponent = () => {
  const { data: session } = useSession();
  const user = session?.user as CustomUser;
  const { name } = user;

  if (!session) {
    return redirect('/login');
  }
  const [users, setUsers] = useState<CustomUser[] | null>(null);
  const [error, setError] = useState("")

  const getUsers = async () => {
    const response = await axios.get('/api/auth/register')
      .then((res) => {
        const data = res.data
        console.log('data', data)
        setUsers(data)
      })
      .catch((err) => {
        setError(err)
      })

  }
  useEffect(() => {
    getUsers()
  }, [])
  return (
    // <div>
    //   <h1>Welcome {name}</h1>
    //   {
    //     users && users.map(item =>(
    //       <h1 key={item.id}>{item.name}</h1>
    //     ))
    //   }
    //   <TextError>{error}</TextError>
    // </div>
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all users. You can see their information here.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>User</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {
                    users && users.map((item) => {
                      const { id, name, role, email, image } = item;
                      const getFirstLetter = email ? email.charAt(0).toUpperCase() : '';
                      return <tr key={item.id}>
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              {image ?
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={image || ''}
                                  alt=""
                                /> :
                                <div className="w-12 h-12 rounded-full bg-green-400 flex justify-center items-center text-white text-lg font-bold">
                                  {getFirstLetter}
                                </div>
                              }
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {name}
                              </div>
                              <div className="text-sm text-gray-700">{email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {item.role}
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default DashboardComponent