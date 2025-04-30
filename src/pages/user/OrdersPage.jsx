import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getUserOrders } from "../../services/orderServices";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders();
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to load orders");
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Orders</h2>
  
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold mb-2">Order #{order._id.slice(-6)}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <strong>Shipment Status:</strong> {order.orderStatus}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>
              <div>
                <h4 className="font-semibold mb-2">Products:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {order.products.map((product) => (
                    <li key={product.productId._id}>
                      {product.productId.title} - Quantity: {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default OrdersPage;
