import React from 'react'

function TeachersTableItem() {
  return (<tr className='table__tr'>
    <td className="table_td">1</td>
    <td className="table_td">name</td>
    <td className="table_td">surname</td>
    <td className="table_td">monthly salary</td>
    <td className="table_td">group</td>
    <td className="table_td">password</td>
    <td className="table_td">
      <button className="table_btn">edit</button>
      <button className="table_btn">delete</button>
    </td>
  </tr>)
}

export default TeachersTableItem
