import React, { useEffect, useState } from 'react'
import "./AdminWorker.css"
import WorkersTableItem from '../../components/WorkersTableItem/WorkersTableItem'
import AdminWorkerModal from '../../components/Modal/AdminWorkerModal'

function AdminWorker() {
  const [workers, setWorkers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState("")
  
  async function getWorkers(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/workers.json")
      const data = await res.json()

      if(data){
        const array = Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
        setWorkers(array)
      }else{
        setWorkers(data)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getWorkers()
  },[])

  return (<main className='site__main admin__main'>
      <section className="workers">
        <h1 className="workers_title">EVERY WORKERS</h1>
        <table className="workers__table">
            <thead className="table__header">
                <tr className="table__tr">
                  <th className="table_th">No'</th>
                  <th className="table_th">Name</th>
                  <th className="table_th">Surname</th>
                  <th className="table_th">Monthly salary</th>
                  <th className="table_th">Role</th>
                  <th className="table_th">Password</th>
                  <th className="table_th">Buttons</th>
                </tr>
            </thead>
            <tbody className="table__main">
                {
                    workers? 
                      workers?.map((el, index) => <WorkersTableItem key={index} worker={el} index={index} setOpenModal={setOpenModal} setFirebaseKey={setFirebaseKey}/>) 
                        :<tr className='table__tr null__tr'>
                          <td className="table_td null_td" colSpan={7}><h3 className="teachers_null-title">O'qtuvchilar mavjud emas</h3></td>
                        </tr>
                }
            </tbody>
            <tfoot className="table__foot">
                <tr className="table__tr">
                  <th className="table_th" colSpan={7}>Workers</th>
                </tr>
            </tfoot>
        </table>
      </section>
      {
        openModal && <AdminWorkerModal setOpenModal={setOpenModal} firebaseKey={firebaseKey}/>
      }
  </main>)
}

export default AdminWorker
