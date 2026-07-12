import React from 'react'
import "./AdminProductsItem.css"

function AdminProductsItem({product, setFirebaseKey, setOpenModal}) {

  async function deleteProduct(firebaseKey){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/products/${firebaseKey}.json`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      console.log(data)
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }

  return (<div className='products__item'>
    <img src={product.image} width={150} alt="" className="products_img" />
    <h3 className="products_title">{product.name}</h3>
    <div className="products__content">
      <strong className="product_price">{product.price} so'm</strong>
      <small className="products_small">{product.howMany}</small>
    </div>
    <div className="products__btn">
      <button className="products_btn edit" onClick={(evt) => {
        evt.preventDefault()
        setOpenModal(true)
        setFirebaseKey(product.firebaseKey)
      }}>edit</button>
      <button className="products_btn delete" onClick={(evt) => {
        evt.preventDefault()
        deleteProduct(product.firebaseKey)
      }}>delete</button>
    </div>
  </div>)
}

export default AdminProductsItem
