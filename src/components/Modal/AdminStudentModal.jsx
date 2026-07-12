import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./AdminStudentModal.css"

function AdminStudentModal({setOpenModal}) {
  const {firebaseKey} = useParams()
  const [group, setGroup] = useState({})
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({})

  async function getGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`)
        const data = await res.json()
        setGroup({
            groupName: data.groupName,
            teacherName: data.teacherName
        })
        setStudents(students? [...data.students] : [])
    }catch(err){
        console.log(err.message)
    }
  }
  async function postGroup(){
    try{
        const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/groups/${firebaseKey}.json`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...group,
              students:[
                ...students, 
                student
              ]
            })
        })
        const data = await res.json()
        setGroup(data)
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
  }

  useEffect(() => {
    getGroup()
  },[])
  return (<div className='background'>
    <form className="student__form" onSubmit={(evt) => {
        evt.preventDefault()
        postGroup()
    }}>
        <div className="form__content">
            <h2 className="student_title">O'quvchi qo'shish</h2>
            <button className="close_btn" onClick={(evt) => {
                evt.preventDefault()
                setOpenModal(false)
            }}>&times;</button>
        </div>
        <div className="student__content">
            <label htmlFor="name" className="student_label">ism:</label>
            <input id='name' type="text" className="student_input" onChange={(evt) => {
                setStudent({...student, name: evt.target.value})
            }}/>
        </div>
        <div className="student__content">
            <label htmlFor="surname" className="student_label">familiya:</label>
            <input id='surname' type="text" className="student_input" onChange={(evt) => {
                setStudent({...student, surName: evt.target.value})
            }}/>
        </div>
        <div className="student__content">
            <label htmlFor="phone" className="student_label">telefon:</label>
            <input id='phone' type="number" className="student_input" onChange={(evt) => {
                setStudent({...student, phone: evt.target.value})
            }}/>
        </div>
        <div className="student__content">
            <label htmlFor="monthlySum" className="student_label">oylik to'lo'v:</label>
            <input id='monthlySum' type="number" className="student_input" onChange={(evt) => {
                setStudent({...student, monthlySum: evt.target.value})
            }}/>
        </div>
        <div className="student__content">
            <strong className="group_name">{group?.groupName}</strong>
        </div>
        <button className="student_btn">Jo'natish</button>
    </form>
  </div>)
}

export default AdminStudentModal
