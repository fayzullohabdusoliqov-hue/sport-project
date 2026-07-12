import React, { useEffect, useState } from 'react'
import "./AdminWorkerModal.css"

function AdminWorkerModal({setOpenModal, firebaseKey}) {
  const [worker, setWorker] = useState({
    monthlySalary: "",
    name:"",
    password: 0 ,
    role:"",
    surName:""
  })
  const [passwords, setPasswords] = useState([])

  async function postWorker(){
    try{
        const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/workers.json",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(worker)
        })
        const data = await res.json()

        if(worker.role !== "cleaner"){
            const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: worker.name,
                    password: worker.password,
                    role: worker.role
                })
            })
            const data = await res.json()
        }
    }catch(err){
        console.log(err.message)
    }finally{
        window.location.reload()
    }
  } 
  
  async function patchWorker(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/workers/${firebaseKey}.json`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(worker)
      })
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  async function getWorker(){

    if(!firebaseKey) return;

    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/workers/${firebaseKey}.json`)
      const data = await res.json()
      setWorker(data)
    }catch(err){
      console.log(err.message)
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
    getPasswords()
    getWorker()
  },[])

  return (<div className='background'><form className="worker__form" onSubmit={(evt) => {
    evt.preventDefault()

    if(firebaseKey){
      patchWorker()
    }else{
      postWorker()
    }
  }}>
      <div className="form__content">
        <h2 className="worker_title">{firebaseKey? "Ma'lumotni o'zgartirish" : "Ishchi qo'shish"}</h2>
        <button className="close_btn" onClick={(evt) => {
          evt.preventDefault()
          setOpenModal(false)
        }}>&times;</button>  
      </div>
      {
        firebaseKey? <></> :<div className="worker__content">
          <label htmlFor="name" className="worker_label">ism:</label>
          <input id='name' type="text" className="worker_input" onChange={(evt) => {
              setWorker({...worker, name: evt.target.value})
          }}/>
        </div>
      }
      <div className="worker__content">
        <label htmlFor="surname" className="worker_label">familiya:</label>
        <input id='surname' type="text" className="worker_input" onChange={(evt) => {
            setWorker({...worker, surName: evt.target.value})
        }} value={worker?.surName}/>
      </div>
      <div className="worker__content">
        <label htmlFor="monthlySalary" className="worker_label">oylik to'lo'v:</label>
        <input id='monthlySalary' type="text" className="worker_input" onChange={(evt) => {
            setWorker({...worker, monthlySalary: evt.target.value})
        }} value={worker?.monthlySalary}/>
      </div>
      {
        firebaseKey? <></> : <div className="worker__content">
          <label htmlFor="role" className="worker_label">rolni tanlang:</label>
          <select id="role" className="worker_select" onChange={(evt) => {
              setWorker({...worker, role: evt.target.value})
          }}>             
              <option value="null" className="worker_option">rolni tanlang</option>
              <option value="operator" className="worker_option">operato'r</option>
              <option value="cleaner" className="worker_option">farrosh</option>
          </select>
        </div>
      }
      {
        firebaseKey? <></> : worker.role !== "cleaner" ? <div className="worker__content">
            <label htmlFor="password" className="worker_label">paro'l:</label>
            <input id='password' type="number" className="worker_input" onChange={(evt) => {
               let passwordValue = evt.target.value
               setWorker({...worker, password: evt.target.value})
               checkPassword(passwordValue)
            }}/>
        </div> : <></>
      }
      <button className="worker_btn">Jo'natish</button>
  </form></div>)
}

export default AdminWorkerModal
