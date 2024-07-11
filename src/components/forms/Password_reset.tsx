"use client";

import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ReusableInput from "./ReusableInput";
import { Formik, Form } from "formik";
import CustomBtn from "./CustomBtn";
import TextError from "./TextError";
import { ResetPasswordType } from "@/data";
import * as Yup from 'yup';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";

const Password_Reset = ({ params }: { params: { email: string } }) => {
  const searchParams = useSearchParams()
  const initialValues: ResetPasswordType = {
    password: '',
    password_confirmation: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/, 'Password must contain both letters and numbers')
      .required('Required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (values: ResetPasswordType) => {

    await axios.post('/api/auth/reset-password', {
      ...values,
      email: params,
      signature: searchParams.get("signature")
    })
      .then(res => {
        const response = res.data;
        if (response.status === 200) {
          toast.success(response.message, { theme: "colored" });
        } else if (response.status === 400) {
          setError(response.errors);
        } else if (response.status === 500) {
          toast.success(response.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setError(err?.message)
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] p-5 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">Forgot Password ?</h1>
          <p>
            Don't worry it happens. Just enter your email below and we will send
            an email to you.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form className="mt-8">
                <div className="space-y-5">
                  <ReusableInput name='password' label='Password' type='password' />
                  <ReusableInput name='password_confirmation' label='Confirm Password' type='password' />
                  <TextError>{error}</TextError>
                  <div>
                    <CustomBtn>Reset Password</CustomBtn>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Password_Reset

