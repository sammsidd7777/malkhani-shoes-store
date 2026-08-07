import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from '../../component/auth/Login'
const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  async function isUserLoggedIn(){
      let response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/current`, {credentials: "include"})
      if(response.ok) setIsLoggedIn(true);  
  };

  useEffect(()=>{
    isUserLoggedIn()
  }, []);

  return (
    <div>
        {isLoggedIn ? <Navigate to={"/userdetail"} />: <Login />}
    </div>
  )
}

export default LoginPage