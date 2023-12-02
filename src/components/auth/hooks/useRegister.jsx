'use client'

import { API_URL } from '@/config/apiUrl'
import { useState } from 'react'

export const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
  })
  console.log(registerData)

   function handleChange(e) {
    const {name, value} = e.target;
    setRegisterData({...registerData, [name]: value})
  }

  async function handleSubmitReg(){
    setLoading(true)
    const {name, email, password} = registerData;
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({name, email, password}), 
      }); 
    const data = await res.json();
    
    if(!data){
        setLoading(false)
        console.log("Something went wrong! Try again")
        return;
    }
    setLoading(false)
    console.log(data);
  }

  return {loading, handleChange, handleSubmitReg}

}
