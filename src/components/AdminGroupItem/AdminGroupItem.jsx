import React, { useEffect, useState } from 'react'
import "./AdminGroupItem.css"
import { useParams } from 'react-router-dom'

function AdminGroupItem({student, index, setOpenModal, setEditObject}) {
  const {firebaseKey} = useParams()
  const [info, setInfo] = useState([])
  
  async function getStudents(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`)
      const data = await res.json()
      setInfo(data)
    }catch(err){
      console.log(err)
    }
  }
  async function deleteStudent(){
    let filterStudents = info.students?.filter((el) => el.name != student.name && el.surName != student.surName && el.phone != student.phone && el.monthlySum != student.monthlySum)

    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          groupName: info?.groupName,
          teacherName: info?.teacherName,
          students: filterStudents
        })
      })
      const data = await res.json()
      console.log(data)
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  useEffect(() => {
    getStudents()
  },[])

  return (<div className='group_detail-item'>
    <div className="group__item-inner">
      <strong className="group_item-id">{index + 1}</strong>
      <div className="group__item-content">
        <h3 className="group_title-name">{student.name}</h3>
        <small className="group_small-surname">{student.surName}</small>
      </div>
    </div>
    <div className="group__item-inner">
      <div className="group__item-content">
        <strong className="group_item-sum">{student.monthlySum} so'm</strong>
        <small className="group_item-phone">{student.phone}</small>
      </div>
      <div className="group__item-btn">
        <button className="group_item-btn edit_item-btn" onClick={(evt) => {
          evt.preventDefault()
          setOpenModal(true)
          setEditObject(student)
        }}>edit</button>
        <button className="group_item-btn delete" onClick={(evt) => {
          evt.preventDefault()
          deleteStudent()
        }}>delete</button>
      </div>
    </div>
  </div>)
}

export default AdminGroupItem
