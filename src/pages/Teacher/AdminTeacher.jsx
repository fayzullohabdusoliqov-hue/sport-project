import React, { useEffect, useState } from 'react'
import "./AdminTeacher.css"
import TeachersTableItem from '../../components/TeachersTableItem/TeachersTableItem'

function AdminTeacher() {
  const [teachers, setTeachers] = useState([])
  
  async function getTeachers(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/teachers.json")
      const data = await res.json()

      if(data){
        const array = Object.values(data)
        setTeachers(array)
      }else{
        setTeachers(data)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getTeachers()
  },[])

  return (<main className='site__main admin__main'>
    <section className="teachers">
      <h1 className="teachers_title">EVER TEACHERS</h1>
      <table className="teachers__table">
        <thead className="tabel__header">
            <tr className="table__tr">
              <th className="table_th">No'</th>
              <th className="table_th">Name</th>
              <th className="table_th">Surname</th>
              <th className="table_th">Monthly salary</th>
              <th className="table_th">Group</th>
              <th className="table_th">Password</th>
              <th className="table_th">Buttons</th>
            </tr>
        </thead>
        <tbody className="table__main">
            {
                teachers? 
                  teachers?.map((el, index) => <TeachersTableItem key={index} teacher={el} index={index}/>) 
                    :<tr className='table__tr null__tr'>
                      <td className="table_td null_td" colSpan={7}><h3 className="teachers_null-title">O'qtuvchilar mavjud emas</h3></td>
                    </tr>
            }
        </tbody>
        <tfoot className="table__footer"></tfoot>
      </table>
    </section>
  </main>)
}

export default AdminTeacher
