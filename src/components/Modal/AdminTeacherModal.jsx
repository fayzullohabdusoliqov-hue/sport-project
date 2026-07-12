import React, { useEffect, useRef, useState } from 'react'
import "./AdminTeacherModal.css"

function AdminTeacherModal({setOpenModal, firebaseKey}) {
  const [teacher, setTeacher] = useState({
    name: "",
    surName: "",
    monthlySalary: 0,
    group: "",
    password: 0
  })
  const [passwords, setPasswords] = useState([])

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

  async function getTeacher(){
    if(!firebaseKey) return;

    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/teachers/${firebaseKey}.json`)
      const data = await res.json()
      setTeacher(data)
    }catch(err){
      console.log(err.message)
    }
  }

  async function patchTeacher(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/teachers/${firebaseKey}.json`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teacher)
      })
      const data = await res.json()
      console.log(data)
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  async function getPasswords(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/profile.json`)
      const data = await res.json()
      const array = await Object.values(data)
      const password = array.map((el) => el.password)
      setPasswords(password)
    }catch(err){
      console.log(err.message)
    }
  }

  function checkPassword(value){
    for(let i = 0; i < passwords.length; i++){
      if(passwords[i] == value){
        alert(`${value} Bu paro'l qo'lanilgan`)
      }
    }
  }

  useEffect(() => {
    getTeacher()
    getPasswords()
  },[])

  return (<div className='background'><form className="teacher__form" onSubmit={(evt) => {
    evt.preventDefault()
    if(firebaseKey){
      patchTeacher()
    }else{
      postTeacher()
    }
  }}>
      <div className="form__content">
        <h2 className="teacher_title">{firebaseKey? "Ma'lumotni o'zgartirish" : "O'qtuvchi qo'shish"}</h2>
        <button className="close_btn" onClick={(evt) => {
          evt.preventDefault()
          setOpenModal(false)
        }}>&times;</button>  
      </div>
      {
        firebaseKey? <></> : <div className="teacher__content">
          <label htmlFor="name" className="teacher_label">ism:</label>
          <input id='name' type="text" className="teacher_input" onChange={(evt) => {
            setTeacher({...teacher, name: evt.target.value})
          }} value={teacher?.name}/>
        </div>
      }
      <div className="teacher__content">
        <label htmlFor="surName" className="teacher_label">familiya:</label>
        <input id='surName' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, surName: evt.target.value})
        }} value={teacher?.surName}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="monthlySalary" className="teacher_label">oylik to'lo'v:</label>
        <input id='monthlySalary' type="number" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, monthlySalary: evt.target.value})
        }} value={teacher?.monthlySalary}/>
      </div>
      <div className="teacher__content">
        <label htmlFor="group" className="teacher_label">guruh:</label>
        <input id='group' type="text" className="teacher_input" onChange={(evt) => {
          setTeacher({...teacher, group: evt.target.value})
        }} value={teacher?.group}/>
      </div>
      {
        firebaseKey? <></> : <div className="teacher__content">
          <label htmlFor="password" className="teacher_label">paro'l:</label>
          <input id='password' type="number" className="teacher_input" onChange={(evt) => {
            let passwordValue = evt.target.value
            setTeacher({...teacher, password: evt.target.value})
            checkPassword(passwordValue)
          }}/>
        </div>
      }
      <button className="teacher_btn">Jo'natish</button>
    </form></div>)
}

export default AdminTeacherModal
