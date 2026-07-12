import React, { useEffect, useState } from 'react'
import "./AdminGroupDetail.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AdminGroupItem from '../../components/AdminGroupItem/AdminGroupItem'
import AdminGroupModal from '../../components/Modal/AdminGroupModal'

function AdminGroupDetail() {
  const {firebaseKey} = useParams()
  const navigate = useNavigate("")
  const [group, setGroup] = useState([])
  const [openEditModal, setOpenEditModal] = useState(false)

  async function getGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`)
        const data = await res.json()
        setGroup(data)
    }catch(err){
        console.log(err.message)
    }
  }
  async function deleteGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
    }catch(err){
        console.log(err.message)
    }finally{
        navigate("/admin/group")
    }
  }

  useEffect(() => {
    getGroup()
  },[])
  
  return (<main className='site__main admin__main'>
    <section className="group__detail">
        <div className="group__detail-content">
            <div className="group__detail-header">
              <div className="group__detail-head">
                <h1 className="group_detail-title">{group?.teacherName}</h1>
                <small className="group_detail-small">{group?.groupName}</small>
              </div>
              <div className="group__detail-btn">
                <button className="group_detail-btn edit" onClick={(evt) => {
                  evt.preventDefault()
                  setOpenEditModal(true)
                }}>edit</button>
                <button className="group_detail-btn delete" onClick={(evt) => {
                  evt.preventDefault()
                  deleteGroup()
                }}>delete</button>
              </div>
            </div>
            <div className="group__detail-wraper">
                {
                  group?.students ? group?.students?.map((el, index) => <AdminGroupItem student={el} index={index} key={index}/>)
                   : <div className='null__group'>
                    <h3 className="null_title">O'quvchilar mavjud emas</h3>
                   </div>
                }
            </div>
        </div>
    </section>
    {
      openEditModal && <AdminGroupModal setOpenModal={setOpenEditModal} firebaseKey={firebaseKey}/>
    }
  </main>)
}

export default AdminGroupDetail
