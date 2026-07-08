import React from 'react'
import "./AdminSidebar.css"
import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  return (<aside className='site__sidebar'>
    <ul className="sidebar__list">
      <li className="sidebar_item"><NavLink to={"/admin/home"}>Home</NavLink></li>
      <li className="sidebar_item"><NavLink to={"/admin/teacher"}>Teacher</NavLink></li>
      <li className="sidebar_item"><NavLink to={"/admin/group"}>Group</NavLink></li>
      <li className="sidebar_item"><NavLink to={"/admin/shop"}>Shop</NavLink></li>
    </ul>
  </aside>)
}

export default AdminSidebar
