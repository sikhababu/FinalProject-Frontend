import { useEffect } from "react";
import { toast } from "sonner";
import { createOrder } from "../../services/orderServices";
import { Link } from "react-router-dom";


const PaymentSuccess = () => {

    // const navigate = useNavigate();

    useEffect(() => {
        const placeOrder = async () => {
          try {
            await createOrder(); // API call
            toast.success("Order placed successfully!");
        
          } catch (error) {
            toast.error("Failed to create order");
            console.error(error);
          }
        };
    
        placeOrder();
      }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 text-center p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Thank you for your purchase! Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Go to Homepage
      </Link>
      <Link
        to="/orders"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
      >
       View my Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
