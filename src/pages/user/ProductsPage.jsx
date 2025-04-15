
//import { useEffect } from 'react'
//import { useState } from 'react'
//import axios from 'axios'


import { useEffect, useState } from 'react'
import { listProducts } from '../../services/productServices'
import { toast } from 'sonner'

import { addToCart } from '../../services/cartServices'



function ProductsPage() {
 const [Products, setProducts] = useState([])

  useEffect(() => {
   listProducts().then((res) =>{
   
   setProducts(res?.data)
    console.log(res?.data)
   

  }).catch((err)=>{

    toast.error(err?.response?.data?.error || "Error loading products");
  })
  }, [])

  const handleAddToCart = (productId)=>{

addToCart({productId, quantity : 1}).then((res) =>{
   
  
   console.log(res?.data)
   toast.success("Product added to cart")

 }).catch((err)=>{


   toast.error(err?.response?.data?.error,"error message")
 })

  }

  return (
<div className="flex flex-wrap gap-6 justify-center p-4">
    {
      Products.map((product)=>
      
      (<div key={product._id} className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src={product?.image}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product?.title}</h2>
          <p>{product?.description}</p>
          <p>Price : {product?.price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"onClick={()=> handleAddToCart(product._id)}>Add to Cart</button>
          </div>
        </div>
      </div>)


      )

    }
    


</div>
  )
}

export default  ProductsPage;
