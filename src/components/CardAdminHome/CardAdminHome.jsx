import React from 'react'
import "./CardAdminHome.css"

function CardAdminHome({title, info}) {
  return (<div className='admin__card'>
    <h3 className="card_title">{title}</h3>
    <p className="card_text">{info}</p>
  </div>)
}

export default CardAdminHome
