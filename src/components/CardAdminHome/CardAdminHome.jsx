import React from 'react'
import "./CardAdminHome.css"

function CardAdminHome({title, info, content}) {
  return (<div className='admin__card'>
    <h3 className="card_title">{title}</h3>
    <p className="card_text">{info}{content}</p>
  </div>)
}

export default CardAdminHome
