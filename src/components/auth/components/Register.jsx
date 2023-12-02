import { Button, Input, Link } from '@nextui-org/react'
import React from 'react'

export const Register = () => {
  return (
    <div>
      <div className='mb-5'>
        <h1 className='text-3xl font-bold'>Create an account</h1>
        <p>Welcome to EventSzn!</p>
      </div>
      <div className="space-y-3 ">
      <Input type="name" label="Name" />
      <Input type="email" label="Email" />
      <Input type="password" label="Password" />
      <Button color="primary">Register</Button>
      <div>
        <span><p>Already have an account ?</p></span>
      </div>
    </div>
    </div>
    
  )
}
