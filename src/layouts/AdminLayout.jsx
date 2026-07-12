import React, { useState } from 'react'
import "./AdminLayout.css"
import AdminHeader from '../components/Header/AdminHeader'
import AdminSidebar from '../components/Sidebar/AdminSidebar'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import AdminTeacherModal from '../components/Modal/AdminTeacherModal'
import AdminGroupModal from '../components/Modal/AdminGroupModal'
import AdminProductModal from '../components/Modal/AdminProductModal'
import AdminStudentModal from '../components/Modal/AdminStudentModal'
import AdminWorkerModal from '../components/Modal/AdminWorkerModal'

function AdminLayout() {
  const [openModal, setOpenModal] = useState(false)
  const location = useLocation()
  const {firebaseKey} = useParams()

  return (<div className='admin__layout'>
    <AdminHeader setOpenModal={setOpenModal}/>
    <AdminSidebar/>
     {
      openModal && (
        location.pathname === "/admin/teacher"? <AdminTeacherModal setOpenModal={setOpenModal}/> : 
        location.pathname === "/admin/group" ? <AdminGroupModal setOpenModal={setOpenModal}/> :
        location.pathname === "/admin/shop" ? <AdminProductModal setOpenModal={setOpenModal}/> :
        location.pathname === `/admin/groupDetail/${firebaseKey}` ? <AdminStudentModal setOpenModal={setOpenModal}/> : 
        location.pathname === "/admin/worker" ? <AdminWorkerModal setOpenModal={setOpenModal}/> :<></>
      )
     }
    <Outlet/>
  </div>)
}

export default AdminLayout
