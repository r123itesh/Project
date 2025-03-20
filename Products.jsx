import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';


const ITEMS_PER_PAGE = 9;

const Products = () => {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [starRatingFilter, setStarRatingFilter] = useState('');
  const [bestSellerFilter, setBestSellerFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching products...");
    axios.get('http://127.0.0.1:5000/api/phones')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filterProducts = (searchQuery = '') => {
    let filtered = products.filter(product =>
      product.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (priceFilter) {
      filtered = filtered.filter(product =>
        parseFloat(product.Price.replace('$', '').replace(',', '')) <= priceFilter
      );
    }

    if (starRatingFilter) {
      filtered = filtered.filter(product =>
        parseFloat(product["Star Rating"]) >= starRatingFilter
      );
    }

    if (bestSellerFilter) {
      filtered = filtered.filter(product =>
        product["Best Seller"] === "True"
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const toINR = (price) => {
    let priceStr = parseFloat(price.slice(1)).toFixed(2);
    return parseFloat(priceStr * 84.7).toFixed(2);
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const handleViewDetails = (asin) => {
    navigate(`/product-details/${asin}`); // Use dynamic ASIN
  };


  const CartSection = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();



    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700/50">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Comparison Portal
            <span className="text-sm font-normal text-gray-400">({cart.length} items)</span>
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">Choose Devices</p>
              <p className="text-gray-500 text-sm mt-2">Add some devices to get comparison!</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/30 group"
                  >
                    <img
                      src={product['Image URL'] || '/placeholder.svg'}
                      alt={product.Title}
                      className="w-20 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                        {product.Title}
                      </h3>
                      <p className="text-sm text-blue-400 mt-1 font-semibold">₹{toINR(product.Price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/comparison')}
                disabled={cart.length !== 2}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${cart.length === 2
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                    : 'bg-gray-800 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Compare Specification
              </button>
              <button
                onClick={clearCart}
                className="w-full mt-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-300"
              >
                Remove Devices
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 mx-auto w-full">
      <div className="relative">
        <div className="h-32 w-32 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-blue-400 animate-spin"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="text-center p-8 rounded-2xl bg-gray-800/50 border border-red-500/20 shadow-xl">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Error Loading Products</h2>
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">

      <main className="flex-grow pt-20 w-[90%] mx-auto">
        <div className="mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 sticky top-24 h-[calc(100vh-6rem)]">
              <CartSection />
            </div>

            <div className="md:w-3/4 space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        filterProducts(e.target.value);
                      }}
                      placeholder="Search for a product..."
                      className="w-full pl-12 pr-4 h-12 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="sm:hidden px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    Filters
                  </button>
                </div>

                <div className={`flex flex-wrap gap-4 transition-all duration-300 ${isFilterOpen ? 'max-h-96' : 'max-h-0 sm:max-h-none overflow-hidden sm:overflow-visible'}`}>
                  <select
                    value={priceFilter}
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                      filterProducts(searchQuery);
                    }}
                    className="px-4 h-12 rounded-xl bg-gray-800/50 text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="">All Prices</option>
                    <option value="100">Under ₹10000</option>
                    <option value="200">Under ₹15000</option>
                    <option value="300">Under ₹25000</option>
                  </select>

                  <select
                    value={starRatingFilter}
                    onChange={(e) => {
                      setStarRatingFilter(e.target.value);
                      filterProducts(searchQuery);
                    }}
                    className="px-4 h-12 rounded-xl bg-gray-800/50 text-white border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4★ & above</option>
                    <option value="4.5">4.5★ & above</option>
                  </select>

                  <label className="flex items-center gap-3 px-4 h-12 rounded-xl bg-gray-800/50 border border-gray-700/50 cursor-pointer hover:bg-gray-700/50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={bestSellerFilter}
                      onChange={(e) => {
                        setBestSellerFilter(e.target.checked);
                        filterProducts(searchQuery);
                      }}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded-md border-gray-600 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500/50 transition duration-200"
                    />
                    <span className="text-white">Best Seller</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.ASIN}
                    className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"

                  >
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                      <img
                        src={product["Image URL"] || "/placeholder.svg"}
                        alt={product.Title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <h2 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                        {product.Title}
                      </h2>
                      <div className="space-y-3">
                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          ₹{toINR(product.Price)}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(product["Star Rating"])
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-600"
                                  }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">({product["Star Rating"]})</span>
                        </div>
                        <p className="text-sm text-gray-400">{product["Sales Volume"]}</p>
                      </div>
                      <div className="pt-4 space-y-3">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                        >
                          Compare
                        </button>
                        <button
                          onClick={() => handleViewDetails(product.ASIN)} // Pass the ASIN from the product
                          className="flex items-center justify-center w-full h-12 rounded-xl bg-gray-700/50 text-white hover:bg-gray-700 transition-all duration-300"
                        >
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </button>


                        <a
                          href={product["Product URL"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full h-12 rounded-xl bg-gray-700/50 text-white hover:bg-gray-700 transition-all duration-300"
                        >
                          Go to Amazon
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 h-12 rounded-xl font-medium transition-all duration-300 ${currentPage === 1
                        ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                      }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show the first two, last two, and current page with neighbors
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .reduce((acc, page, index, array) => {
                      // Add ellipsis where needed
                      if (index > 0 && page !== array[index - 1] + 1) {
                        acc.push('...');
                      }
                      acc.push(page);
                      return acc;
                    }, [])
                    .map((item, index) =>
                      typeof item === 'number' ? (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item)}
                          className={`w-12 h-12 rounded-xl font-medium transition-all duration-300 ${currentPage === item
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20'
                              : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                            }`}
                        >
                          {item}
                        </button>
                      ) : (
                        <span key={index} className="w-12 h-12 flex items-center justify-center text-gray-400">
                          {item}
                        </span>
                      )
                    )}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 h-12 rounded-xl font-medium transition-all duration-300 ${currentPage === totalPages
                        ? 'bg-gray-800/50 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                      }`}
                  >
                    Next
                  </button>
                </div>
              )}


            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Products;

