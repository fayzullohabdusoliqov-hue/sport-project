import React, { useEffect, useState } from 'react'
import "./AdminGroupModal.css"
import { useParams } from 'react-router-dom'

function AdminGroupModal({setOpenModal, firebaseKey}) {
  const [group, setGroup] = useState({
    teacherName: "",
    groupName: ""
  })
  const [teachers, setTeachers] = useState([])

  async function postGroup(){
    try{
        const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/groups.json",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        })
        const data = await res.json()
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
  }
  async function patchGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        })
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
  }
  async function getGroup(){
    if(!firebaseKey) return;

    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`)
      const data = await res.json()
      setGroup(data)
    }catch(err){
      console.log(err.message)
    }
  }
  async function getTeachers(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json`)
      const data = await res.json()
      const array = await Object.values(data)
      setTeachers(array)
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    getGroup()
    getTeachers()
  },[])

  return (<div className='background'><form className='group__form' onSubmit={(evt) => {
    evt.preventDefault()

    if(firebaseKey){
      patchGroup()
    }else{
      postGroup()
    }
  }}>
    <div className="form__content">
      <h2 className="group_title">{firebaseKey? "Ma'lumotni o'zgartirish" : 'Guruh yaratish'}</h2>
      <button className="close_btn" onClick={(evt) => {
        evt.preventDefault()
        setOpenModal(false)
      }}>&times;</button>
    </div>
    <div className="group__content">
        <label htmlFor="groupName" className="group_label">Guruhning ismi:</label>
        <input id='groupName' type="text" className="group_input" onChange={(evt) => {
            setGroup({...group, groupName: evt.target.value})
        }} value={group?.groupName}/>
    </div>
    <div className="group__content">
        <label htmlFor="teacherName" className="group_label">O'qtuvchining ismi:</label>
        <select className='group_select' id="teacherName" onChange={(evt) => {
            setGroup({...group, teacherName: evt.target.value})
        }}>
          <option value="null">o'qtuvchi tanlang</option>
          {
            teachers? 
             teachers?.map((el, index) => <option key={index} className='group_option' value={el.name}>{el.name}</option>) :
              <option className='group_option' value={"don't have teacher"}>o'qtuvchi mavjud emas</option>
          }
        </select>
    </div>
    <button className="group_btn">Jo'natish</button>
  </form></div>)
}

export default AdminGroupModal
