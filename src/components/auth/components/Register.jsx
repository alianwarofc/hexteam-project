'use client'

import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useRegister } from '../hooks/useRegister'

export const Register = () => {
  const {loading, handleChange, handleSubmitReg} = useRegister()
  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <p>Welcome to EventSzn!</p>
      </div>
      <div className="space-y-3 ">
      <Input name="name" label="Name" onChange={handleChange}/>
      <Input name="email" label="Email" onChange={handleChange}/>
      <Input name="password" type="password" label="Password" onChange={handleChange} />
      <Button isDisabled={loading} color="primary" onClick={handleSubmitReg}>Register</Button>
      <div>
        <span><p>Already have an account ?</p></span>
      </div>
    </div>
    </div>
    
  )
}
