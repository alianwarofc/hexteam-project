'use client'

import { API_URL } from '@/config/apiUrl'
import { useState } from 'react'
import toast from 'react-hot-toast'

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
    const {name, email, password} = registerData;
    let error = "";
    console.log(name);
    console.log(email);
    console.log(password);

    if (!name) error += "Name is required\n";
    if (!email) error += "Email is required\n";
    if (!password) error += "Password is required\n";

    if (error) {
      alert(error);
      return;
    }
    setLoading(true)
    
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({name, email, password}), 
      }); 
    const data = await res.json();
    
    if(!data){
        setLoading(false)
        toast.error("Something went wrong! Try again")
        return;
    }
    setLoading(false)
    toast.success("Register success, please login!")
  }

  return {loading, handleChange, handleSubmitReg}

}
