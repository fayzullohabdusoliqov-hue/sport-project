import React from 'react'
import "./CardAdminGroup.css"
import { useNavigate } from 'react-router-dom'

function CardAdminGroup({group}) {
  const navigate = useNavigate("")

  return (<div className='group_card' onClick={(evt) => {
    evt.preventDefault()
    navigate(`/admin/groupDetail/${group.firebaseKey}`)
  }}>
    <h3 className="group_subtitle">{group.teacherName}</h3>
    <small className="group_small">{group.groupName}</small>
  </div>)
}

export default CardAdminGroup
