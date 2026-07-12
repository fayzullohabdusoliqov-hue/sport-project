import React, { useEffect } from 'react'
import logo from "../../../public/icon/logo.png"
import "./AdminHeader.css"
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function AdminHeader({setOpenModal}) {
  const profile = localStorage.getItem("profile")
  const profileObject = JSON.parse(profile)
  const navigate = useNavigate("")
  const loaction = useLocation()

  return (<header className='site__header'>
    <div className="header__content">
      <div className="header_img"><img src={logo} alt="" className="header_image" /></div>
      <div className="header__profile">
        <h3 className="header_subtitle">{profileObject.name}</h3>
        <small className="header_small"><strong className="small_storng">password: </strong> {profileObject.password}</small>
      </div>
    </div>
    <div className="header__btn">
      <button className="header_btn" onClick={(evt) => {
        evt.preventDefault()
        navigate("/logout")
        localStorage.clear("profile")
      }}>logout</button>
      {
        location.pathname !== "/admin/home" ? 
          <button className="header_btn" onClick={(evt) => {
            evt.preventDefault()
            setOpenModal(true)
          }}>add</button> : <></>
      }
    </div>
  </header>)
}

export default AdminHeader
