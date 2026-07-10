import React, { useEffect, useState } from 'react'
import "./AdminTeacherModal.css"

function AdminTeacherModal({setOpenModal}) {
  const [teacher, setTeacher] = useState({
    name: "",
    surName: "",
    monthlySalary: "",
    group: "",
    password: 0
  })
  const [groups, setGroups] = useState([])

  async function postTeacher(){
    try{
      const resT = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json",{
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(teacher)
      })
      const resP = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nmae: teacher.name,
          password: teacher.password,
          role: "teacher",
        })
      })
      console.log(data)
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  return (<form className="teacher__form" onSubmit={(evt) => {
    evt.preventDefault()
    postTeacher()
  }}>
      <div className="form__content">
        <h2 className="teacher_title">O'qtuvchi qo'shish</h2>
        <button className="close_btn" onClick={() => {
          setOpenModal(false)
        }}>&times;</button>  
      </div>
      <div className="teacher__content">
        <label htmlFor="name" className="teacher_label">ism:</label>
        <input id='name' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, name: evt.target.value})
        }}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="surName" className="teacher_label">familiya:</label>
        <input id='surName' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, surName: evt.target.value})
        }}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="monthlySalary" className="teacher_label">oylik to'lo'v:</label>
        <input id='monthlySalary' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, monthlySalary: evt.target.value})
        }}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="group" className="teacher_label">guruh:</label>
        <input id='group' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, group: evt.target.value})
        }}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="password" className="teacher_label">paro'l:</label>
        <input id='password' type="number" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, password: evt.target.value})
        }}/>
      </div>
      <button className="teacher_btn">Jo'natish</button>
    </form>)
}

export default AdminTeacherModal
