import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const PhoneComparison = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (cart.length !== 2) {
    return (
      <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Please select exactly 2 phones to compare</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Return to Products
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-500">Phone Comparison</h1>
          <button 
            onClick={() => navigate('/products')}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Back to Products
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cart.map((phone, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-lg bg-gray-800 transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center">{phone.Title}</h3>
              <img
                src={phone['Image URL']}
                alt={phone.Title}
                className="w-full h-64 object-contain mb-6 rounded-lg"
              />
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium">Price:</span>
                  <span>{phone.Price}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium">Star Rating:</span>
                  <span>{phone['Star Rating']} ⭐</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium">Number of Ratings:</span>
                  <span>{phone['Number of Ratings']}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium">Prime Eligible:</span>
                  <span>{phone['Prime Eligible'] ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="font-medium">Sales Volume:</span>
                  <span>{phone['Sales Volume']}</span>
                </div>
                <a
                  href={phone['Product URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  View on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneComparison;