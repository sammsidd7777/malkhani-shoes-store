import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Protect() {

  const [userRole, setUserRole] = useState([])

  const fatchData = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/current`, { credentials: "include" })

      if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`); }
      
      const data = await response.json();
      setUserRole(data.message.userRole)
    } catch (error) {
      resizeBy.status(400).json({ status: "400", message: error.message })
    }
  }

  useEffect(() => {
    fatchData()
  }, [])

  return (
    <>

      {userRole == "admin" || userRole == "user" ? <Outlet /> : <h1>Protected route</h1>}
    </>
  )
}