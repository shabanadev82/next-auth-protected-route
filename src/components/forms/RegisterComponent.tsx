'use client';

import React, { useState } from 'react'
import Link from 'next/link';
import { RegisterProps } from '@/data';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import ReusableInput from './ReusableInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextError from './TextError';
import CustomBtn from './CustomBtn';

const RegisterComponent = () => {
  const router = useRouter();
 const [error, setError] = useState<string>("")
  
  const initialValues: RegisterProps = {
    email: '',
    password: '',
    name: '',
    password_confirmation: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must be 15 characters or less')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Password must contain both letters and numbers')
      .required('Required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });
  const onSubmit = async (values: RegisterProps) => {
    await axios.post('api/auth/register',values)
    .then(res => {
        console.log('res',res.data)   
        if(res.status == 200){
          const {data}= res;
            router.push(`/login?message=${data.msg}`);
        }     
})
    .catch(err => {
        setError(err);
}
    )
  };
  return (
    <section className='bg-gray-300'>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="mx-auto bg-white py-6 px-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?
              <Link
                href="/login"
                title=""
                className="font-medium text-black transition-all duration-200 hover:underline ml-2"
              >
                Sign In
              </Link>
            </p>
          <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (
      <Form className="mt-8">
        <ReusableInput name='name' label='Full Name' type='text' />
        <ReusableInput name='email' label='Email' type='email' />
        <ReusableInput name='password' label='Password' type='password' />
        <ReusableInput name='password_confirmation' label='Confirm Password' type='password' />
        <TextError>{error}</TextError>
        <div>
                  <CustomBtn>
                    Create Account
                  </CustomBtn>
                </div>
      </Form>
      )}
      </Formik>
            <p className="text-center my-3">-- OR --</p>
            <div className="space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="30px"
                    height="30px"
                  >
                    <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z" />
                  </svg>
                </span>
                Sign in with Github
              </button>
            </div>

            {/* Google Login Button */}
            <div className="space-y-3 mt-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none">
                <span className="mr-2 inline-block"></span>
                {/* <Image
                  src="/google_icon.png"
                  height={30}
                  width={30}
                  alt="Google Icon"
                  className="mr-3"
                /> */}
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default RegisterComponent