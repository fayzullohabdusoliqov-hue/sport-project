import React from 'react'
import "./AdminGroupItem.css"

function AdminGroupItem({student, index}) {
  return (<div className='group_detail-item'>
    <div className="group__item-inner">
      <strong className="group_item-id">{index + 1}</strong>
      <div className="group__item-content">
        <h3 className="group_title-name">{student.name}</h3>
        <small className="group_small-surname">{student.surName}</small>
      </div>
    </div>
    <div className="group__item-inner">
      <div className="group__item-content">
        <strong className="group_item-sum">{student.monthlySum} so'm</strong>
        <small className="group_item-phone">{student.phone}</small>
      </div>
      <div className="group__item-btn">
        <button className="group_item-btn edit">edit</button>
        <button className="group_item-btn delete">delete</button>
      </div>
    </div>
  </div>)
}

export default AdminGroupItem
