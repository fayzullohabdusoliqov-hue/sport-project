import React, { useState } from 'react'

function TeachersTableItem({teacher, index}) {

  async function deleteTeacher(firebaseKey) {
    try {
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json")
      const data = await res.json()

      const profiles = Object.values(data)
      const deleteProfile = profiles.filter((el) => el.password !== teacher.password)

      const resT = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/teachers/${firebaseKey}.json`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const resP = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json",{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteProfile),
      })
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }
  return (<tr className='table__tr'>
    <td className="table_td">{index + 1}</td>
    <td className="table_td">{teacher.name}</td>
    <td className="table_td">{teacher.surName}</td>
    <td className="table_td">{teacher.monthlySalary} so'm</td>
    <td className="table_td">{teacher.group}</td>
    <td className="table_td">{teacher.password}</td>
    <td className="table_td">
      <button className="table_btn edit">edit</button>
      <button className="table_btn delete" onClick={(evt) => {
        evt.preventDefault()
        deleteTeacher(teacher.firebaseKey)
      }}>delete</button>
    </td>
  </tr>)
}

export default TeachersTableItem
