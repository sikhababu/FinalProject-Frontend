import { useEffect, useState } from 'react';
import { listProducts } from '../../services/productServices';
import { toast } from 'sonner';

import { addToCart, listCart } from '../../services/cartServices';
import { setCartItems } from '../../features/cart/CartSlice';
import { useDispatch } from 'react-redux';

function ProductsPage() {
  const [Products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchCart = () => {
    listCart()
      .then((res) => {
        dispatch(setCartItems(res.data.cart));
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch cart");
      });
  };

  useEffect(() => {
    listProducts()
      .then((res) => {
        setProducts(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error loading products");
      });
  }, []);

  const handleAddToCart = (productId) => {
    addToCart({ productId, quantity: 1 })
      .then((res) => {
        console.log(res?.data);
        toast.success("Product added to cart");
        fetchCart();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Error adding to cart");
      });
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
      <div className="flex flex-wrap gap-6 justify-center">
        {Products.map((product) => (
          <div key={product._id} className="card bg-base-100 dark:bg-gray-800 text-black dark:text-white w-96 shadow-sm">
            <figure className="bg-white dark:bg-gray-700">
              <img src={product?.image} alt="Product" className="p-4 max-h-60 object-contain" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product?.title}</h2>
              <p>{product?.description}</p>
              <p className="font-semibold">Price: ₹{product?.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => handleAddToCart(product._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
