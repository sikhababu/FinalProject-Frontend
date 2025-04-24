import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { listCart } from '../../services/cartServices';
import { setCartItems } from '../../features/cart/CartSlice';


function HomePage() {
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const fetchCart = () => {
  const isLogged = localStorage.getItem('userId');
  if(isLogged){
  listCart().then((res) => {
     
      dispatch(setCartItems(res.data.cart))
      
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error || "Failed to fetch cart");
  
    });}
};

useEffect(() => {
  fetchCart();
}, []);

  return (
    <div
    className="hero min-h-screen"
    style={{
      backgroundImage: "url(https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_758,h_426/https://welpmagazine.com/wp-content/uploads/2020/10/158-758x426.jpeg)",
    }}>
    <div className="hero-overlay"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md">
        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
        <p className="mb-5">
          Welcome to your favourite fashion destination!!!
        </p>
        <button className="btn btn-primary" onClick={()=>navigate("/products")}>Get Started</button>
      </div>
    </div>
  </div>
  );
}

export default HomePage
