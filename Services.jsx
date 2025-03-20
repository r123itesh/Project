import React from 'react';

const Services = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 to-blue-700 w-[90%] mx-auto">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl mb-8">Comprehensive Solutions for All Your Tech Needs</p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 px-4 w-[90%] mx-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Device Protection Plans</h3>
              <p className="text-gray-400">Safeguard your devices with our comprehensive protection plans against damage and theft.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Express Delivery</h3>
              <p className="text-gray-400">Get your devices delivered quickly with our fast and reliable delivery services.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
              <p className="text-gray-400">Get expert technical support for all your device-related queries and issues.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade-In Program</h3>
              <p className="text-gray-400">Upgrade your devices by trading in your old ones for credit towards new purchases.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Configurations</h3>
              <p className="text-gray-400">Get your devices customized to your specific needs and preferences.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Extended Warranty</h3>
              <p className="text-gray-400">Extend the life of your devices with our comprehensive warranty plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gray-800 w-[90%] mx-auto">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Custom Solutions?</h2>
          <p className="text-xl mb-8">Contact us to discuss tailored service packages for your specific needs.</p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Contact Sales Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default Services;

