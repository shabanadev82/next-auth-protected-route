import Password_Reset from '@/components/forms/Password_reset'
import React from 'react'

const Reset_Password = ({params}:{params:{email:string}}) => {
  return (
  <Password_Reset params={params} />
  )
}

export default Reset_Password