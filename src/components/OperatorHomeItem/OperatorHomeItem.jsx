import React from 'react'
import "./OperatorHomeItem.css"

function OperatorHomeItem({student, index}) {
  return (<tr className="operator__tr">
    <td className="operator_td">{index + 1}</td>
    <td className="operator_td">{student.teacherName}</td>
    <td className="operator_td">{student.groupName}</td>
    <td className="operator_td">{student.name}</td>
    <td className="operator_td">{student.surName}</td>
    <td className="operator_td">{student.phone}</td>
    <td className="operator_td">{student.monthlySum}</td>
  </tr>)
}

export default OperatorHomeItem
