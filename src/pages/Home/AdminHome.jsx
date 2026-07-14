import React, { useEffect, useState } from 'react'
import "./AdminHome.css"
import CardAdminHome from '../../components/CardAdminHome/CardAdminHome'
import ResultCardAdminHome from '../../components/ResultCardAdminHome/ResultCardAdminHome'

function AdminHome() {
  const [teachers, setTeachers] = useState(0)
  const [students, setStudents] = useState(0)
  const [workers, setWorkers] = useState(0)
  const [roules, setRoules] = useState(0)
  const [products, setProducts] = useState(0)
  const [groups, setGroups] = useState(0)
  const [monthlyTeachers, setMonthlyTeachers] = useState(0)
  const [monthlyWorkers, setMonthlyWorkers] = useState(0)
  const [monthlyStudents, setMonthlyStudents] = useState(0)
  const [monthlyProducts, setMonthlyProducts] = useState(0)
  const [monthlyRent, setMonthlyRent] = useState(0)
  const [profit, setProfit] = useState(0)

  async function getTeachers(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.values(data)
        setTeachers(array.length)

        let monthlyTeachers = 0
        for(let i = 0; i < array.length; i++){
          monthlyTeachers += Number(array[i].monthlySalary)
        }
        setMonthlyTeachers(monthlyTeachers)
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
        let monthlyStudent = 0
        for(let i = 0; i < students.length; i++){
          everyStudents += students[i]
        }
        for (let i = 0; i < array.length; i++) {
          const students = array[i].students;

          for (let j = 0; j < students.length; j++) {
            monthlyStudent += Number(students[j].monthlySum)
          }
        }
        setMonthlyStudents(monthlyStudent)
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
  async function getMonthlyWorker(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/workers.json")
      const data = await res.json()

      if(data){
        const array = await Object.values(data)

        let monthlyWorkers = 0
        for(let i = 0; i < array.length; i++){
          monthlyWorkers += Number(array[i].monthlySalary)
        }
        setMonthlyWorkers(monthlyWorkers)
      }else{
        setMonthlyWorkers(0)
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
        console.log(array)
        setProducts(array.length)

        let monthlyProducts = 0
        for(let i = 0; i < array.length; i++){
          monthlyProducts += Number(array[i].price) * Number(array[i].howMany)
        }
        setMonthlyProducts(monthlyProducts)
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
    getMonthlyWorker()
    getRoules()
    getProducts()
    getGroups()
  },[])
  return (<main className='site__main admin__main'>
    <section className="dashboard">
      <h1 className="dashboard_title">DASHBOARD</h1>
      <div className="dashboard__content">
        <CardAdminHome title={"Teachers"} info={teachers} content="ta"/>
        <CardAdminHome title={"Students"} info={students} content="ta"/>
        <CardAdminHome title={"Workers"} info={workers} content="ta"/>
        <CardAdminHome title={"Roules"} info={roules} content="ta"/>
        <CardAdminHome title={"Products"} info={products} content="ta"/>
        <CardAdminHome title={"Groups"} info={groups} content="ta"/>
        <CardAdminHome title={"Rent"} info={groups} content=" so'm"/>
      </div>
    </section>
    <section className="results">
      <h2 className="results_title">RESULTS</h2>
      <div className="results__wraper">
        <ResultCardAdminHome title={"Ishchilarning oyligi"} info={monthlyWorkers + monthlyTeachers}/>
        <ResultCardAdminHome title={"O'qtuvchilarning oyligi"} info={monthlyTeachers}/>
        <ResultCardAdminHome title={"Maxsulot sotilgandan keying pul"} info={monthlyProducts}/>
        <ResultCardAdminHome title={"O'quvchilardan keladigan pul"} info={monthlyStudents}/>
      </div>
    </section>
  </main>)
}

export default AdminHome
