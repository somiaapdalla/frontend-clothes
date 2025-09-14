import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:1000/getalldocs/product";

export default function CategoriesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // --- Best Sellers: 4 xabbo
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 5);

  // --- Latest Collection: 8 xabbo ugu dambeeyay (latest products)
  const latestCollection = products.slice(-8).reverse();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">

        {/* Best Sellers Section */}
        {bestSellers.length > 0 && (
          <>
            <h1 className="text-5xl font-extrabold text-center mb-12">Best Sellers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {bestSellers.map((prod) => (
                <motion.div
                  key={prod._id}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/product/${prod._id}`}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={`http://localhost:1000/allDocs/${prod.primage}`}
                        alt={prod.name}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-center font-semibold text-gray-900 text-lg">
                      {prod.name}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Latest Collection Section */}
        {latestCollection.length > 0 && (
          <>
            <h1 className="text-5xl font-extrabold text-center mb-12">Latest Collection</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {latestCollection.map((prod) => (
                <motion.div
                  key={prod._id}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/product/${prod._id}`}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer"
                  >
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        src={`http://localhost:1000/allDocs/${prod.primage}`}
                        alt={prod.name}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-center font-semibold text-gray-900 text-lg">
                      {prod.name}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
