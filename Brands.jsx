// src/components/Brands.js
import React, { useEffect, useState } from "react";
import axios from "axios";

// API endpoint and headers
const API_URL = "https://mobile-phone-specs-database.p.rapidapi.com/gsm/all-brands";
const API_HEADERS = {
  "x-rapidapi-host": "mobile-phone-specs-database.p.rapidapi.com",
  "x-rapidapi-key": "295a19cd1emsh67eb42a360251c3p1efb10jsn893c3fab8e6a",
};

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch brands data from the API when the component mounts
  useEffect(() => {
    axios
      .get(API_URL, { headers: API_HEADERS })
      .then((response) => {
        setBrands(response.data); // API returns the list directly
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load brands.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-white">Loading...</div>;
  }

  if (error) {
    return <div className="w-screen min-h-screen flex justify-center items-center font-bold text-red-500">
      <p>
      {error}
      </p> 
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 w-screen min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-white mb-8">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="brand-card bg-gray-800 shadow-lg p-6 rounded-lg text-center hover:bg-gray-700 transition duration-300"
          >
            <h3 className="text-xl font-medium text-white">{brand.brandValue}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
