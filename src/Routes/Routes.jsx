import {createBrowserRouter} from "react-router-dom";

import PageLayout from "../Layouts/PageLayout";
import Loginpage from "../pages/user/Loginpage";
import CartPage from "../pages/user/CartPage";

import SignupPage from "../pages/user/SignupPage";
import AboutPage from "../pages/user/AboutPage";

import HomePage from "../pages/user/Homepage";
import ProductsPage from "../pages/user/ProductsPage";
import Admindashboard from "../pages/admin/Admindashboard";
;
import UserProfile from "../pages/user/UserProfile";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentFailure from "../pages/user/PaymentFailure";
import OrdersPage from "../pages/user/OrdersPage";
import EditProfilePage from "../pages/user/EditProfilePage";
import SellerDashboard from "../pages/seller/sellerDashboard";


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
      element: <Loginpage role="user"/>
    
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
      path: "products/:categoryId",  // dynamic param
      element: <ProductsPage />
    },
    
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
      path: "userProfile",
      element: <UserProfile />
    
    }
    ,

    
    {
      path: "payment/success",
      element: <PaymentSuccess />
    
    },
    {
      path: "payment/failure",
      element: <PaymentFailure />
    
    },

    {
      path: "orders",
      element: <OrdersPage />
    
    },
    {
      path: "edit-profile",
      element: <EditProfilePage />
    
    }


      ]

    },

    {
      path: "/admin",
      element: <PageLayout />,


    children : [

      { path: "login",
      element: <Loginpage role="admin"/>

    },
    {
    path: "dashboard",
    element: <Admindashboard />

    }
  ]},

  {
    path: "/seller",
    element: <PageLayout />,


  children : [

    { path: "login",
    element: <Loginpage role="seller"/>

  },
  {
  path: "dashboard",
  element: <SellerDashboard />

}
  
  
  ]


}
   

  ]);
  