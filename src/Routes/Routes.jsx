import {createBrowserRouter} from "react-router-dom";

import PageLayout from "../Layouts/PageLayout";
import ProductDetails from "../pages/user/ProductDetails";
import Loginpage from "../pages/user/Loginpage";
import CartPage from "../pages/user/CartPage";

import SignupPage from "../pages/user/SignupPage";
import AboutPage from "../pages/user/AboutPage";

import HomePage from "../pages/user/Homepage";
import ProductsPage from "../pages/user/ProductsPage";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,


    children : [

      { path: "",
      element: <HomePage />

    },

    {
      path: "login",
      element: <Loginpage />
    
    }
    ,
    {
      path: "about",
      element: <AboutPage />
    
    },
    {
      path: "products",
      element: <ProductsPage />
    
    }
    ,

    {
      path: "cart",
      element: <CartPage />
    
    }
    ,

    {
      path: "signup",
      element: <SignupPage />
    
    }
    ,

    {
      path: "ProductDetail/:id",
      element: <ProductDetails />
    
    }
    

    


      ]

    }
   

  ]);
  