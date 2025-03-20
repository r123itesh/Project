import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Filters from './components/Filters';
import Mobiles from './components/Mobiles';
import Loader from './components/Loader';
import MOCK_MOBILE_DATA from './assets/MOCK_DATA';
import List from './components/List';
import Otp from './components/Otp';
import Description from './components/Description';
import Brands from './components/Brands';
import Products from './components/Products';
import PhoneComparison from './components/Comparison';
import Register from './components/Register';
import VerifyOtp from './components/VerifyOTP';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import { useLocation } from 'react-router-dom';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import PaymentGateway from './components/PatementGateway';
import ProductDetails from './components/individualProduct';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobiles, setMobiles] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    ram: '',
    price: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const [userName, setUserName] = useState('');

  // Function to add a mobile to the list
  const addToList = (mobile) => {
    setList((prevList) => [...prevList, mobile]);
  };

  // Function to delete a mobile from the list
  const handleDelete = (deviceId) => {
    setList((prevList) => prevList.filter((mobile) => mobile.device_id !== deviceId));
  };

  // Fetch mobiles data (mock data)
  useEffect(() => {
    const fetchMobiles = () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = MOCK_MOBILE_DATA;

        const allDevices = data.data.flatMap((brand) =>
          brand.device_list.map((device) => ({
            ...device,
            brand_name: brand.brand_name,
            device_ram: parseInt(device.device_ram, 10) || 0,
            device_price: parseInt(device.device_price, 10) || 0,
          }))
        );

        setMobiles(allDevices);
        setFilteredMobiles(allDevices);
      } catch (error) {
        console.error('Error loading mock data:', error);
        setError('Failed to load mobile data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMobiles();
  }, []);

  // Apply filters to the mobiles data
  useEffect(() => {
    if (isLoading) return;
  
    const filtered = mobiles.filter((mobile) => {
      const brandMatch = !filters.brand || mobile.brand_name === filters.brand;
      const ramMatch =
        !filters.ram || mobile.device_ram >= parseInt(filters.ram, 10);
      const priceMatch =
        !filters.price || mobile.device_price <= parseInt(filters.price, 10);
  
      return brandMatch && ramMatch && priceMatch;
    });
  
    setFilteredMobiles(filtered);
  }, [filters, mobiles, isLoading]);
  

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} userName={userName} />
        <Routes>
          <Route path="/" element={<Products />} />
          
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register setUserName={setUserName} />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<Home userName={userName} mobiles={mobiles} filteredMobiles={filteredMobiles} filters={filters} setFilters={setFilters} list={list} handleDelete={handleDelete} addToList={addToList} isLoading={isLoading} />} />
          <Route path="/description/:id" element={<Description mobiles={mobiles} />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:asin" element={<ProductDetails />} />
          <Route path="/patementgateway" element={<PaymentGateway />} />
          <Route path="/comparison" element={<PhoneComparison />} />
          <Route path="/cart" element={<PaymentGateway />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;