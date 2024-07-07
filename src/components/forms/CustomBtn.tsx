import React from 'react'

const CustomBtn = ({children}:{children:React.ReactNode}) => {
  return   <button
  type="submit"
  className={`inline-flex w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-green-300 bg-green-800`}
>{children}
</button>
}

export default CustomBtn