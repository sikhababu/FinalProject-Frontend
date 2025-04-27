import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { listCart } from '../../services/cartServices';
import { setCartItems } from '../../features/cart/CartSlice';
import { listCategories } from '../../services/categoryServices'; 

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const fetchCart = () => {
    const isLogged = localStorage.getItem('userId');
    if (isLogged) {
      listCart()
        .then((res) => {
          dispatch(setCartItems(res.data.cart));
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "Failed to fetch cart");
        });
    }
  };

  const fetchCategories = () => {
    listCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch categories");
      });
  };

  useEffect(() => {
    fetchCart();
    fetchCategories();
  }, []);

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: 'url(/images/hero.jpg)' }}>
        <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center">
          <h1 className="text-4xl font-bold mb-4">Style that Speaks</h1>
          <p className="mb-6">Discover the latest trends in fashion</p>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-primary px-6 py-2"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/products/category/${cat._id}`)}
              className="cursor-pointer group overflow-hidden rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={cat?.image} 
                alt={cat?.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="p-4 bg-white text-center font-semibold">{cat?.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
