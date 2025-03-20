import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="py-8 bg-gray-900 text-white w-screen min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-2xl mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Please select product for Comparison.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {cart.map((product, index) => (
            <div key={index} className="rounded-lg border border-gray-700 shadow-lg overflow-hidden bg-gray-800 flex flex-col justify-between">
              <img 
                src={product["Image URL"]} 
                alt={product.Title} 
                className="w-full h-80 object-cover" 
              />
              <div className="flex flex-col justify-between p-4">
                <h2 className="text-xl font-semibold text-white">{product.Title}</h2>
                <p className="text-lg text-gray-400 mt-2">{`Rs.${product.Price}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;