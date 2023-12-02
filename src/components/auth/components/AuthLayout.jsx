import React from 'react'
import { Image } from '@nextui-org/react'

export const AuthLayout = ({children}) => {
  return (
    <main className='h-screen w-full grid lg:grid-cols-2'>
      <div className=' lg:bg-blue-600'/>
      <div className='flex justify-center items-center'>
        <div>{children}</div>
      </div>
      
    </main>
  )
}
