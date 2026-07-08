import React from 'react'
import "./AdminHome.css"
import CardAdminHome from '../../components/CardAdminHome/CardAdminHome'

function AdminHome() {
  return (<main className='site__main admin__main'>
    <section className="dashboard">
      <h1 className="dashboard_title">DASHBOARD</h1>
      <div className="dashboard__content">
        <CardAdminHome title={"Teachers"} info={15}/>
        <CardAdminHome title={"Products"} info={15}/>
        <CardAdminHome title={"Groups"} info={15}/>
        <CardAdminHome title={"Roules"} info={15}/>
      </div>
    </section>
  </main>)
}

export default AdminHome
