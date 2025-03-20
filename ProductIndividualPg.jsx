import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductIndividualPg = () => {
  const { id } = useParams(); // Fetch the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // Fetch product details by ID
    axios
      .get(`http://127.0.0.1:5000/api/phones`) // Adjust the endpoint if necessary
      .then((response) => {
        const productData = response.data.find((item) => item.ASIN === id);
        if (productData) {
          setProduct(productData);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Product Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-1">
            <img
              src={product["Image URL"] || "/placeholder.svg"}
              alt={product.Title}
              className="w-full h-auto rounded shadow-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{product.Title}</h1>
            <p className="text-lg text-gray-400">{product.Description}</p>
            <p className="text-2xl font-semibold text-green-400">
              ₹{parseFloat(product.Price.replace("$", "") * 84.7).toFixed(2)} (approx)
            </p>
            <p className="text-gray-400">
              <span className="font-medium">Star Rating:</span>{" "}
              {product["Star Rating"]} ★ ({product["Number of Ratings"]} ratings)
            </p>
            <p className="text-gray-400">
              <span className="font-medium">Prime Eligible:</span>{" "}
              {product["Prime Eligible"] === "True" ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Buy Now Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition shadow-md hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductIndividualPg;
