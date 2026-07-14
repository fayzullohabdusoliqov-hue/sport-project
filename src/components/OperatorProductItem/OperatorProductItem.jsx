import React from 'react'
import "./OperatorProductItem.css"

function OperatorProductItem({product, setFirebaseKey}) {

  async function patchProduct(firebaseKey){
    try{
      const res = await fetch(`https://sport-project-18919-default-rtdb.firebaseio.com/products/${firebaseKey}.json`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            howMany: product.howMany - 1
        })
      })
      const data = await res.json()
      console.log(data)
    }catch(err){
      console.log(err.message)
    }finally{
      window.location.reload()
    }
  }
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
    <button className="products_btn delete" onClick={(evt) => {
      evt.preventDefault()
      
      if(product.howMany == 0 || product.howMany == 1){
        deleteProduct(product.firebaseKey)
      }else{
        patchProduct(product.firebaseKey)
      }
    }}>buy</button>
  </div>)
}

export default OperatorProductItem