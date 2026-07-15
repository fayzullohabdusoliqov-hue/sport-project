import React from 'react'
import TeacherHeader from '../components/Header/TeacherHeader'
import { Outlet } from 'react-router-dom'

function TeacherLayout() {
  return (<div className='teacher__layout'>
    <TeacherHeader/>
    <Outlet/>
  </div>)
}

export default TeacherLayout
