import { Navigate, Outlet } from 'react-router-dom'
import NavBar from './../../components/navbar/NavBar'
import './Layout.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Layout() {
  return (
    <div className='layout'>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

function RequireAuth() {

  const {currentUser} = useContext(AuthContext)

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className='layout'>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export {Layout, RequireAuth}