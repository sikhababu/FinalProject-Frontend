import { useEffect, useState } from "react";
import { listCart, removeFromCart, clearCart } from "../../services/cartServices";
import { toast } from "sonner";

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = () => {
    listCart()
      .then((res) => {
        setCart(res.data.cart);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch cart");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = (productId) => {
    removeFromCart( productId )
      .then((res) => {
        console.log(res)
        toast.success("Product removed");
        fetchCart();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to remove");
      });
  };

  const handleClearCart = () => {
    clearCart()
      .then((res) => {
        console.log(res)
        toast.success("Cart cleared");
        fetchCart();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to clear cart");
      });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!cart || cart.products.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-4">
        {cart.products.map((item) => (
          <div
            key={item.productId._id}
            className="card bg-base-100 shadow-md flex flex-row items-center p-4"
          >
            <figure className="w-24 h-24 mr-4">
              <img
                src={item.productId.image}
                alt={item.productId.title}
                className="object-cover w-full h-full rounded"
              />
            </figure>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{item.productId.title}</h3>
              <p>Price: ₹{item.productId.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-error"
                onClick={() => handleRemove(item.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          Total: ₹{cart.totalPrice?.toFixed(2)}
        </h3>
        <div className="space-x-2">
          <button className="btn btn-outline" onClick={handleClearCart}>
            Clear Cart
          </button>
          <button className="btn btn-success">Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
