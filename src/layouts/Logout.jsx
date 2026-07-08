import React, { useState } from 'react'
import "./Logout.css"
import imgLogo from "../../public/img/logoImg.png"
import Loading from '../components/Loading/Loading'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const navigate = useNavigate("")

  async function getProfile(){
    try{
      setLoading(true)
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/profile.json`)
      const data = await res.json()
      const array = await Object.values(data)
      const profile = await array.find((el) => el.password == password)
      localStorage.setItem("profile", JSON.stringify(profile))

      switch(profile?.role){
        case "admin": 
          navigate("/admin")
          break
        case "operator":
          navigate("/operator")
          break
        case "teacher":
          navigate("/teacher")
          break
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  return (<main className='site__main'>
    <section className="logout">
        <div className="logout__wraper">
          <div className="logout__image">
            <img src={imgLogo} alt="" className="logout_image" />
          </div>
          {
            loading? <Loading/> : <form className="logout__form" onSubmit={(evt) => {
              evt.preventDefault()
              getProfile()
            }}>
              <h2 className="logout_title">TIZIMGA KIRISH</h2>
              <div className="logout__content">
                  <label htmlFor="password" className="logout_label">PAROLINGIZNI KIRITING:</label>
                  <input id='password' type="text" className="logout_input" onChange={(evt) => {
                    setPassword(evt.target.value)
                  }}/>
              </div>
              <button className="logout_btn">Jo'natish</button>
            </form>
            }
        </div>
    </section>
  </main>)
}

export default Logout
