// src/layouts/PageLayout.js
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function PageLayout() {
  return (
<div className="h-screen flex flex-col overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white">
      <Header />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PageLayout;
