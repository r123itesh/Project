import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
    const { asin } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toINR = (price) => {
        if (!price) return '0.00';
        const priceStr = String(price).replace('$', '').replace(',', '');
        const priceNum = parseFloat(priceStr);
        if (isNaN(priceNum)) return '0.00';
        return (priceNum * 84.7).toFixed(2);
    };

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/product?asin=${asin}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [asin]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="max-w-6xl mx-auto py-25 px-4 top-10 relative top-40" > 
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <img
                            src={product.image_url || '/placeholder.svg'}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                        <h1 className="text-3xl font-semibold text-white">{product.title}</h1>

                        {/* Display Price in INR */}
                        <p className="text-xl text-blue-400">
                            ₹{product.price ? toINR(product.price) : 'Price Not Available'}
                        </p>

                        {/* Amazon Choice and Best Seller Badges */}
                        <div className="flex gap-2">
                            {product.amazon_choice === "True" && (
                                <span className="bg-yellow-500 text-black px-2 py-1 rounded-md text-sm">Amazon's Choice</span>
                            )}
                            {product.best_seller === "True" && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm">Best Seller</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-gray-400">{product.description || 'No description available.'}</p>
                        <button onClick={()=> navigate('/patementgateway')}className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Buy Now</button>

                        {/* Star Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.star_rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">({product.star_rating})</span>
                        </div>

                        {/* Sales Volume */}
                        <p className="text-sm text-gray-400">{product.sales_volume}</p>

                        {/* Product Link */}
                        <a
                            href={product.product_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline">
                            View on Store
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
