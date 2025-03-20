import React from 'react';

function Filters({ filters, setFilters, mobiles }) {
  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const brands = [...new Set(mobiles.map((mobile) => mobile.brand_name))].sort((a, b) =>
    a.localeCompare(b)
  );

  const ramOptions = [...new Set(mobiles.map((mobile) => mobile.device_ram))].sort((a, b) => a - b);

  const maxPrice = Math.max(...mobiles.map((mobile) => mobile.device_price));
  const priceRanges = [5000, 10000, 20000, 30000, 50000, maxPrice];

  return (
    <div className="p-4">
      <h2 className="text-white text-lg font-medium mb-4">Filters</h2>

      <div className="mb-4">
        <label className="text-white block mb-2">Brand</label>
        <select
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-white block mb-2">Minimum RAM (GB)</label>
        <select
          value={filters.ram}
          onChange={(e) => handleFilterChange('ram', e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any RAM</option>
          {ramOptions.map((ram) => (
            <option key={ram} value={ram}>
              {ram} GB and above
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="text-white block mb-2">Maximum Price</label>
        <select
          value={filters.price}
          onChange={(e) => handleFilterChange('price', e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any Price</option>
          {priceRanges.map((price) => (
            <option key={price} value={price}>
              ₹{price} and below
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
