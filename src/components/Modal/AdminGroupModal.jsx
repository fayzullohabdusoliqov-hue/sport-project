import React, { useState } from 'react'
import "./AdminGroupModal.css"

function AdminGroupModal({setOpenModal}) {
  const [group, setGroup] = useState({
    teacherName: "",
    groupName: ""
  })

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
        console.log(data)
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
  }

  return (<form className='group__form' onSubmit={(evt) => {
    evt.preventDefault()
    postGroup()
  }}>
    <div className="form__content">
      <h2 className="group_title">Guruh yaratish</h2>
      <button className="close_btn" onClick={(evt) => {
        evt.preventDefault()
        setOpenModal(false)
      }}>&times;</button>
    </div>
    <div className="group__content">
        <label htmlFor="groupName" className="group_label">Guruhning ismi:</label>
        <input id='groupName' type="text" className="group_input" onChange={(evt) => {
            setGroup({...group, groupName: evt.target.value})
        }}/>
    </div>
    <div className="group__content">
        <label htmlFor="teacherName" className="group_label">O'qtuvchining ismi:</label>
        <input id='teacherName' type="text" className="group_input" onChange={(evt) => {
            setGroup({...group, teacherName: evt.target.value})
        }}/>
    </div>
    <button className="group_btn">Jo'natish</button>
  </form>)
}

export default AdminGroupModal
