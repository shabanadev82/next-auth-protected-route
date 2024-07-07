"use client";

import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ReusableInput from "./ReusableInput";
import { Formik, Form } from "formik";
import CustomBtn from "./CustomBtn";
import TextError from "./TextError";
import { ForgotPasswordType } from "@/data";
import * as Yup from 'yup';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPasswordForm = () => {
  
  const initialValues: ForgotPasswordType = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
  });

  const [error, setError] = useState<string>("");

  const onSubmit = async (values: ForgotPasswordType) => {
    console.log('values', values); 
    await axios.post('/api/auth/forgot-password',values)  
    .then(res=>{
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
                  <div>
                    <ReusableInput label="Email Address" name="email" />
                  </div>
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
};

export default ForgotPasswordForm;
