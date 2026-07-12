import React, { useEffect, useState } from 'react'
import "./AdminProductModal.css"

function AdminProductModal({setOpenModal, firebaseKey}) {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: 0,
    howMany: 0
  })

  function fileString(file){
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setProduct({...product, image: fileReader.result})
    }
    fileReader.readAsDataURL(file)
  }

  async function postProduct(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/products.json",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  async function patchProduct(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/products/${firebaseKey}.json`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }
  
  async function getProduct(){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/products/${firebaseKey}.json`)
      const data = await res.json()
      setProduct(data)
    }catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    getProduct()
  },[])

  return (<div className='background'>
    <form className="product__form" onSubmit={(evt) => {
      evt.preventDefault()
      
      if(firebaseKey){
        patchProduct()
      }else{
        postProduct()
      }
    }}>
      <div className="form__content">
        <h2 className="product_title">{firebaseKey? "Ma'lumotni almashtirish" : "Maxsulot qo'shish"}</h2>
        <button className="close_btn" onClick={(evt) => {
          evt.preventDefault()
          setOpenModal(false)
        }}>&times;</button>
      </div>
      <div className="product__form-content">
        <label htmlFor="img" className="product_label">rasm:</label>
        <input id='img' type="file" className="product_input" onChange={(evt) => {
          fileString(evt.target.files[0])
        }}/>
      </div>
      <div className="product__form-content">
        <label htmlFor="name" className="product_label">ism:</label>
        <input id='name' type="text" className="product_input" onChange={(evt) => {
          setProduct({...product, name: evt.target.value})
        }} value={product?.name}/>
      </div>
      <div className="product__form-content">
        <label htmlFor="howMany" className="product_label">qancha borligi:</label>
        <input id='howMany' type="number" className="product_input" onChange={(evt) => {
          setProduct({...product, howMany: evt.target.value})
        }} value={Number(product?.howMany)}/>
      </div>
      <div className="product__form-content">
        <label htmlFor="price" className="product_label">narxi:</label>
        <input id='price' type="number" className="product_input" onChange={(evt) => {
          setProduct({...product, price: evt.target.value})
        }} value={Number(product?.price)}/>
      </div>
      <button className="product_btn">Jo'natish</button>
    </form>
  </div>)
}

export default AdminProductModal
