'use client'

import { Button, Input, Link } from '@nextui-org/react'
import React from 'react'
import { useRegister } from '../hooks/useRegister'

export const Register = () => {
  const {loading, handleChange, handleSubmitReg} = useRegister()
  return (
    <div className='border-3 md:border-3 lg:border-none  rounded-lg  p-10'>
      <div className='mb-12'>
        
        <div className='flex justify-center mb-6'>
          <img src="/logo.png" width={180} alt="" />
        </div>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <p className='text-sm font-medium text-orange-500'>Welcome to EventSzn!</p>
      </div>
      <div className="space-y-3 ">
      <Input size='sm' isRequired name="name" label="Name" onChange={handleChange}/>
      <Input size='sm' isRequired name="email" label="Email" onChange={handleChange}/>
      <Input size='sm' isRequired name="password" type="password" label="Password" onChange={handleChange} />
      
      <div className='flex gap-2 items-center justify-center'>
        <Button isDisabled={loading} color="primary" onClick={handleSubmitReg}>Register</Button>
        <p className='text-sm text-zinc-500'>Have an account ?</p>
        <Link size='sm' href="#"> Log in</Link>


      </div>
    </div>
    </div>
    
  )
}
