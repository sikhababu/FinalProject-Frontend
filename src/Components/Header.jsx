import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { clearCart } from '../features/cart/CartSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark =
      storedTheme === 'dark' ||
      (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <div className="navbar bg-white text-black dark:bg-gray-900 dark:text-white shadow-md px-4">

      <div className="flex-1 flex flex-wrap items-center gap-4 sm:gap-6">
        <a className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
          My Website
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <button className="btn btn-ghost" onClick={() => navigate('/')}>Home</button>
          <button className="btn btn-ghost" onClick={() => navigate('/about')}>About</button>
          <button className="btn btn-ghost" onClick={() => navigate('/products')}>Products</button>
        </div>
      </div>

      <div className="flex-none flex flex-wrap items-center gap-3">
        <button onClick={toggleDarkMode} className="btn btn-ghost btn-circle">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="btn btn-outline btn-sm" onClick={() => navigate('/login')}>
          Join us
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 
                  0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{totalQuantity}</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-white dark:bg-gray-900 text-black dark:text-white z-10 mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">{totalQuantity} Items</span>
              <span className="text-info">Subtotal: ₹{totalPrice}</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block" onClick={() => navigate('/cart')}>
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 text-black dark:text-white rounded-box z-10 mt-3 w-52 p-2 shadow">
            <li><button onClick={() => navigate('/userProfile')}>Profile</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
