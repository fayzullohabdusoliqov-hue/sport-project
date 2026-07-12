import React, { useEffect, useState } from 'react'
import "./AdminHome.css"
import CardAdminHome from '../../components/CardAdminHome/CardAdminHome'

function AdminHome() {
  const [teachers, setTeachers] = useState(0)
  const [students, setStudents] = useState(0)
  const [workers, setWorkers] = useState(0)
  const [roules, setRoules] = useState(0)
  const [products, setProducts] = useState(0)
  const [groups, setGroups] = useState(0)

  async function getTeachers(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        setTeachers(array.length)
      }else{
        setTeachers(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  async function getStudents(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/groups.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        const students = array.map((el) => el.students ? el.students.length : 0)

        let everyStudents = 0
        for(let i = 0; i < students.length; i++){
          everyStudents += students[i]
        }
        setStudents(everyStudents)
      }else{
        setStudents(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  async function getWorkers(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json")
      const data = await res.json()

      if(data){
        const array = await Object.values(data)
        setWorkers(array.length)
      }else{
        setWorkers(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  async function getRoules(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/roules.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        setRoules(array.length)
      }else{
        setRoules(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  async function getProducts(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/products.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        setProducts(array.length)
      }else{
        setProducts(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  async function getGroups(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/groups.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        setGroups(array.length)
      }else{
        setGroups(0)
      }
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    getTeachers()
    getStudents()
    getWorkers()
    getRoules()
    getProducts()
    getGroups()
  },[])
  return (<main className='site__main admin__main'>
    <section className="dashboard">
      <h1 className="dashboard_title">DASHBOARD</h1>
      <div className="dashboard__content">
        <CardAdminHome title={"Teachers"} info={teachers}/>
        <CardAdminHome title={"Students"} info={students}/>
        <CardAdminHome title={"Workers"} info={workers}/>
        <CardAdminHome title={"Roules"} info={roules}/>
        <CardAdminHome title={"Products"} info={products}/>
        <CardAdminHome title={"Groups"} info={groups}/>
      </div>
    </section>
  </main>)
}

export default AdminHome
