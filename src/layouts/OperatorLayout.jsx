import React from 'react'
import OperatorHeader from '../components/Header/OperatorHeader'
import OperatorSidebar from '../components/Sidebar/OperatorSidebar'
import { Outlet } from 'react-router-dom'
import "./OperatorLayout.css"

function OperatorLayout() {
  return (<div className='operator__layout'>
    <OperatorHeader/>
    <OperatorSidebar/>
    <Outlet/>
  </div>)
}

export default OperatorLayout
