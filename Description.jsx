import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Description = ({ mobiles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mobile = mobiles.find((mobile) => mobile.device_id === id);

  if (!mobile) {
    return (
      <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Mobile not found</h2>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-white">{mobile.device_name}</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-700">
            <img 
              src={mobile.device_image || "http://shmector.com/_ph/1/2732272.png"} 
              alt={mobile.device_name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <h3 className="text-lg font-medium text-white mb-4">Specifications</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Brand</dt>
                  <dd className="text-white font-medium">{mobile.brand_name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">RAM</dt>
                  <dd className="text-white font-medium">{mobile.device_ram} GB</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Price</dt>
                  <dd className="text-white font-medium">₹{mobile.device_price}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Type</dt>
                  <dd className="text-white font-medium">{mobile.device_type}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
