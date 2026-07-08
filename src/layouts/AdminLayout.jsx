import React from 'react'
import "./AdminLayout.css"
import AdminHeader from '../components/Header/AdminHeader'
import AdminSidebar from '../components/Sidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (<div className='admin__layout'>
    <AdminHeader/>
    <AdminSidebar/>
    <Outlet/>
  </div>)
}

export default AdminLayout
