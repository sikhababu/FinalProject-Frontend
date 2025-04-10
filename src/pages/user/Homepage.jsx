
//import { useEffect } from 'react'
//import { useState } from 'react'
//import axios from 'axios'


import Loading from '../../components/Loading'
import ProductCard from '../../components/ProductCard'


function Homepage() {
 // const [Products, setProducts] = useState([])
  //useEffect(() => {
  //  axios.get("https://fakestoreapi.com/products").then((res) => {

   //   setProducts(res.data)

  //  }).catch((err) => {
   //   console.log(err)
  //  })
 // }, [])

  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(https://img.freepik.com/premium-photo/two-women-are-posing-with-their-heads-slightly-turned-towards-each-other-hugging-smiling-with-joy-showing-several-shopping-bags-their-hands_283617-4429.jpg?w=1060)",
    }}>
    <div className="hero-overlay"></div>
    <div className="hero-content text-neutral-content text-center">
      
        <button className="btn btn-primary">Get Started</button>
      
    </div>
  </div>
  )
}

export default  Homepage;
