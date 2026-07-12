import React, { useEffect, useState } from 'react'
import CardAdminGroup from '../../components/CardAdminGroup/CardAdminGroup'
import "./AdminGroup.css"

function AdminGroup() {
  const [groups, setGroups] = useState([])

  async function getGroups(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/groups.json")
      const data = await res.json()

      if(data){
        const array = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
        setGroups(array)
      }else{
        setGroups(data)
      }
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
          groups? groups.map((el, index) => <CardAdminGroup group={el} key={index}/>) 
           : <div className='null__group'>
            <h3 className="null_title">Guruhlar mavjud emas</h3>
           </div> 
        }
      </div>
    </section>
  </main>)
}

export default AdminGroup
