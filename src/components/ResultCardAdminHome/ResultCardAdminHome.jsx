import React from 'react'
import "./ResultCardAdminHome.css"

function ResultCardAdminHome({title, info}) {
  return (<div className='result__content'>
    <h3 className="result_title">{title}</h3>
    <div className="result__info">
        <p className="result_info">{info} so'm</p>
    </div>
  </div>)
}

export default ResultCardAdminHome
