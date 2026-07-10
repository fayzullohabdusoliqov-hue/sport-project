import React, { useState } from 'react'
import "./AdminGroupDetail.css"
import { useParams } from 'react-router-dom'
import AdminGroupItem from '../../components/AdminGroupItem/AdminGroupItem'

function AdminGroupDetail() {
  const {firebaseKey} = useParams()
  const [group, setGroup] = useState([])

  async function getGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`)
        const data = await res.json()
        setGroup(data.students)
    }catch(err){
        console.log(err.message)
    }
  }
  return (<main className='site__main admin__main'>
    <section className="group__detail">
        <div className="group__detail-content">
            <h1 className="group_detail-title">O'quvchilar</h1>
            <div className="group__detail-btn">
                <button className="group_detail-btn edit">edit</button>
                <button className="group_detail-btn delete">delete</button>
            </div>
            <div className="group__detail-wraper">
                {
                  group?.map((el, index) => <AdminGroupItem student={el} index={index} key={index}/>)
                }
            </div>
        </div>
    </section>
  </main>)
}

export default AdminGroupDetail
