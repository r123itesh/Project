import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 w-[90%] mx-auto">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MobileMate</h1>
          <p className="text-xl mb-8">Your Trusted Partner in MobileMate Since 2010</p>
          <Link to="/products" className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Explore Our Products
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 w-[90%] mx-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded in 2010, MobileMate began as a small local shop with a big dream: to make cutting-edge technology accessible to everyone. Over the years, we've grown into one of India's most trusted online retailers of smartphones and tech gadgets.
              </p>
              <p className="text-gray-300">
                Our journey has been fueled by a passion for innovation and a commitment to customer satisfaction. We've served over 1 million happy customers and continue to expand our offerings to meet the ever-evolving needs of tech enthusiasts.
              </p>
            </div>
            <div className="md:w-1/2">
              <img src="/about.png" alt="MobileMate Journey" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gray-800 w-[90%] mx-auto">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MobileMate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Products</h3>
              <p className="text-gray-400">All our products are 100% genuine with manufacturer warranty.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Prices</h3>
              <p className="text-gray-400">We offer the best prices and regular deals on latest products.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-400">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
