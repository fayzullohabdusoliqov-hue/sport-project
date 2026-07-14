import React from 'react'
import { NavLink } from 'react-router-dom'
import "./OperatorSidebar.css"

function OperatorSidebar() {
  return (<aside className='operator__sidebar'>
    <ul className="sidebar__list">
      <li className="sidebar_item"><NavLink to={"/operator/home"}>Home</NavLink></li>
      <li className="sidebar_item"><NavLink to={"/operator/shop"}>Shop</NavLink></li>
    </ul>
  </aside>)
}

export default  OperatorSidebar