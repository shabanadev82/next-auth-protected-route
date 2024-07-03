import React from 'react'
import { FieldProps } from '@/data';
import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

const ReusableInput = (props: FieldProps) => {
    const { label, name, ...rest } = props
    return (
        <div className="my-2">
            <div className="flex items-center justify-between">
                <label
                    className="text-base font-medium text-gray-900"
                >
                    {label}
                </label>
            </div>
            <div className="mt-2">
                <Field id={name} name={name} type={name} {...rest}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default ReusableInput