import React, { useEffect, useState } from 'react'
import AdminProductsItem from '../../components/AdminProductItem/AdminProductsItem'
import AdminProductModal from '../../components/Modal/AdminProductModal'

function AdminShop() {
  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [firebaseKey, setFirebaseKey] = useState("")

  async function getProducts(){
    try{
      const res = await fetch("https://sport-project-18919-default-rtdb.firebaseio.com/products.json")
      const data = await res.json()
      
      if(data){
        const array = await Object.entries(data).map(([key, value]) => ({...value, firebaseKey: key}))
        setProducts(array)
      }else{
        setProducts(data)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  useEffect(() => {
    getProducts()
  },[])

  return (<main className='site__main admin__main'>
    <section className="shop">
      <h1 className="shop_title">EVERY PRODUCTS</h1>
      <div className="shop__wraper">
        {
          products ? products?.map((el, index) => <AdminProductsItem key={index} product={el} setFirebaseKey={setFirebaseKey} setOpenModal={setOpenModal}/>)
           : <div className='null__group'>
              <h3 className="null_title">Maxsulotlar mavjud emas</h3>
            </div>
        }
      </div>
    </section>
    {
      openModal && <AdminProductModal setOpenModal={setOpenModal} firebaseKey={firebaseKey}/>
    }
  </main>)
}

export default AdminShop
