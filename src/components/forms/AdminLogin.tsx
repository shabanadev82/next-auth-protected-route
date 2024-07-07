"use client";
import React, { useState } from 'react'
import { LoginProps } from '@/data';
import { Form, Formik } from 'formik'
import * as Yup from 'yup';
import { Rubik_80s_Fade } from 'next/font/google';
import ReusableInput from './ReusableInput';
import TextError from './TextError';
import CustomBtn from './CustomBtn';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminLogin = () => {
    const router = useRouter()
    const initialValues: LoginProps = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Password must contain both letters and numbers')
            .required('Required'),
    });

    const [error, setError] = useState<string>("");

    const onSubmit = async (values: LoginProps) => {
        const res = await signIn("credentials", {
            ...values,
            callbackUrl: "/dashboard",
            redirect: true,
          });
      
          if (res?.error) {
            setError("Invalid email or password");
          }else {
            setError("");
          }
    };

    return (
        <section className='bg-gray-300'>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto bg-white py-6 px-4 rounded-md shadow-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Admin Login
          </h2>
          <p className='text-sm font-bold text-green-800'>Welcom Back</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form className="mt-8">
                <div className="space-y-5">
                  <div>
                    <ReusableInput label='Email Address' name="email" placeholder='admin@gmail.com' />
                    <ReusableInput label='Password' name='password' placeholder='admin123' />
                  </div>
                  <TextError>{error}</TextError>
                  <div>
                    <CustomBtn>Admin Login</CustomBtn>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
    )
}

export default AdminLogin