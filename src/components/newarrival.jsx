import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


// Category images



import ShirtImg from "../assets/img1.png";
import DressImg from "../assets/img1.png";
import JacketImg from "../assets/img1.png";
import PantsImg from "../assets/img1.png";
const API_URL = "http://localhost:1000/getalldocs/product"; // backend endpoint


export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("DATA FROM BACKEND:", data); // debug
        setProducts(data || []); // backend wuxuu soo celinayaa array of products
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // extract unique categories with sample image
  const categories = Array.from(
    (products || []).reduce((map, prod) => {
      if (!map.has(prod.category)) map.set(prod.category, prod.primage);
      return map;
    }, new Map())
  );

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-extrabold text-center mb-12">
          best sellers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(([cat, img], i) => (
            <Link
              to={`/category/${cat.toLowerCase()}`}
              key={i}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
            >
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={`http://localhost:1000/allDocs/${img}`}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center font-semibold text-gray-900">
                {cat}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
