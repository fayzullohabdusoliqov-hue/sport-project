import React from 'react'

function WorkersTableItem({worker, index, setOpenModal, setFirebaseKey}) {
  async function deleteTeacher(firebaseKey) {
    try {
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/profile.json")
      const data = await res.json()

      const profiles = Object.values(data)
      const deleteProfile = profiles.filter((el) => el.password !== worker.password)

      const resT = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/workers/${firebaseKey}.json`,{
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
    <td className="table_td">{worker.name}</td>
    <td className="table_td">{worker.surName}</td>
    <td className="table_td">{worker.monthlySalary} so'm</td>
    <td className="table_td">{worker.role}</td>
    <td className="table_td">{worker.password}</td>
    <td className="table_td">
      <button className="table_btn edit" onClick={(evt) => {
        evt.preventDefault()
        setOpenModal(true)
        setFirebaseKey(worker.firebaseKey)
      }}>edit</button>
      <button className="table_btn delete" onClick={(evt) => {
        evt.preventDefault()
        deleteTeacher(worker.firebaseKey)
      }}>delete</button>
    </td>
  </tr>)
}

export default WorkersTableItem
