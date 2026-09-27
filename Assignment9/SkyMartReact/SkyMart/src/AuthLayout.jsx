import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { MyStore } from './context/Context'
import { toast } from 'react-toastify'

const AuthLayout = () => {
   
    let {loggedInUser} = useContext(MyStore)
    if(Object.keys(loggedInUser).length !== 0){
        
         
        return <Navigate to="/"/>;
    }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
