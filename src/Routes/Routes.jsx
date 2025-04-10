import {createBrowserRouter} from "react-router-dom";
import Homepage from "../pages/user/Homepage";
import PageLayout from "../Layouts/PageLayout";
import ProductDetails from "../pages/user/ProductDetails";
import Loginpage from "../pages/user/Loginpage";
import CartPage from "../pages/user/CartPage";
import ProductsPage from "../pages/user/ProductsPage"
import SignupPage from "../pages/user/SignupPage";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <PageLayout />,


    children : [

      { path: "",
      element: <Homepage />

    },

    {
      path: "login",
      element: <Loginpage />
    
    }
    ,

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
  