import React, { useEffect, useState } from 'react'
import "./AdminHome.css"
import CardAdminHome from '../../components/CardAdminHome/CardAdminHome'

function AdminHome() {
  const [info, setInfo] = useState({
    teachers: 0,
    students: 0,
    workers: 0,
    groups: 0,
    products: 0,
    roules: 0
  })

  async function getInfo(){
    try{
      const resT = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json`)
      const dataT = await resT.json()
      const arrayT = Object.values(dataT)
      console.log(arrayT)
      
      const resG = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups.json`)
      const dataG = await resG.json()
      const arrayG = Object.values(dataG)
      console.log(arrayG)

      const resP = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/praducts.json`)
      const dataP = await resP.json()
      const arrayP = Object.values(dataP)
      console.log(arrayP)

      const resR = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/rouls.json`)
      const dataR = await resR.json()
      const arrayR = Object.values(dataR)
      console.log(arrayR)

      const resW = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/profile.json`)
      const dataW = await resW.json()
      const arrayW = Object.values(dataW)
      console.log(arrayW)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getInfo()
  },[])
  return (<main className='site__main admin__main'>
    <section className="dashboard">
      <h1 className="dashboard_title">DASHBOARD</h1>
      <div className="dashboard__content">
        <CardAdminHome title={"Teachers"} info={info?.teachers}/>
        <CardAdminHome title={"Students"} info={info?.students}/>
        <CardAdminHome title={"Workers"} info={info?.workers}/>
        <CardAdminHome title={"Roules"} info={info?.rouls}/>
        <CardAdminHome title={"Products"} info={info?.praducts}/>
        <CardAdminHome title={"Groups"} info={info?.groups}/>
      </div>
    </section>
  </main>)
}

export default AdminHome
