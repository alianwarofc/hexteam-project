'use client'

import { Button, Input } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { useLogin } from '../hooks/useLogin'

export const Login = () => {
 const {loading, handleChange, handleSubmitLogin} = useLogin();
  return (
    <div className='border-3 md:border-3 lg:border-none  rounded-lg  p-10'>
      <div className='mb-12'>

        <div className='flex justify-center mb-6'>
          <img src="/logo.png" width={180} alt="" />
        </div>
        <h1 className='text-3xl font-bold'>Please Login</h1>
        <p className='text-sm font-medium text-orange-500'>Welcome to EventSzn!</p>
      </div>
      <div className="space-y-3 ">
      <Input size='sm' isRequired name="email" label="Email" onChange={handleChange}/>
      <Input size='sm' isRequired name="password" type="password" label="Password" onChange={handleChange} />

      <div className='flex gap-2 items-center justify-center'>
        <Button isDisabled={loading} color="primary" onClick={handleSubmitLogin}>Login</Button>
        <p className='text-sm text-zinc-500'>Don't have account ?</p>
        <Link size='sm' href="/register"> Register</Link>


      </div>
    </div>
    </div>
    
  )
}