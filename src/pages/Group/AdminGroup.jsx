import React, { useEffect, useState } from 'react'
import CardAdminGroup from '../../components/CardAdminGroup/CardAdminGroup'
import "./AdminGroup.css"

function AdminGroup() {
  const [groups, setGroups] = useState([])

  async function getGroups(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/groups.json")
      const data = await res.json()
      const array = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
      setGroups(array)
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getGroups()
  },[])

  return (<main className="site__main admin__main">
    <section className="group">
      <h1 className="group_title">EVERY GROUPS</h1>
      <div className="group__wraper">
        {
          groups.map((el, index) => <CardAdminGroup group={el} key={index}/>)
        }
      </div>
    </section>
  </main>)
}

export default AdminGroup
