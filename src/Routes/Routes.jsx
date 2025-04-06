import {
    createBrowserRouter,
    
  } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import Homepage from "../pages/user/Homepage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },

    {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/dashboard",
        element:   <h2 className="text-center mt-5">Hi User, Welcome to dashboard</h2>
      },
  ]);

  export default router