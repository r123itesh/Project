import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function Mobiles({ mobiles, isLoading, addToList }) {
  const navigate = useNavigate(); // Hook for navigation

  if (isLoading) {
    return <Loader />;
  }

  if (!mobiles.length) {
    return <p className="text-white">No mobiles found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {mobiles.map((mobile) => (
        <div
          key={mobile.device_id}
          onClick={() => navigate(`/description/${mobile.device_id}`)} // Navigate to detail page
          className="bg-white bg-opacity-10 border-2 border-white border-opacity-20 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
        >
          {/* Conditional Rendering for Image */}
          <img
            src={
              mobile.device_image || 'http://shmector.com/_ph/1/2732272.png'
            }
            alt={mobile.device_name || 'No image available'}
            className="w-full h-48 object-cover rounded mb-4"
            loading="lazy"
          />

          {/* Mobile Details */}
          <h3 className="text-lg font-semibold text-white">
            {mobile.device_name}
          </h3>
          <p className="text-sm text-gray-300">{mobile.brand_name}</p>

          <div className="mt-2 flex justify-between">
            <p className="text-sm text-gray-400">{mobile.device_type}</p>
            <p className="text-sm text-white font-bold">
              ₹{mobile.device_price}
            </p>
          </div>

          <p className="mt-2 text-sm text-gray-300">RAM: {mobile.device_ram} GB</p>

          {/* Add to List Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              addToList(mobile);
            }}
            className="mt-4 bg-blue-600 px-4 py-2 rounded text-white"
          >
            Add to List
          </button>
        </div>
      ))}
    </div>
  );
}

export default Mobiles;
