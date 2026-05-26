import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Breadcrumb from './components/Breadcrumb';
import PartnerLogo from './components/PartnerLogo';
import ShopPage from './pages/ShopPage';
import Chatbot from '../src/components/Chatbot/Chatbot';

function App() {
  return (
    <>
      {/* 1. Thanh điều hướng đầu trang */}
      <Header />

      {/* 2. Thanh vị trí trang */}
      <Breadcrumb />

      {/* 3. Nội dung chính của trang Shop */}
      <ShopPage />

      {/* 4. Khối Carousel các đối tác */}
      <PartnerLogo />

      {/* 5. Khối Chatbot */}
      <Chatbot />

      {/* 6. Khối chân trang */}
      <Footer />
    </>
  );
}

export default App;