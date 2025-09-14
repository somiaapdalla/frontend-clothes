import React from "react";
import { motion } from "framer-motion";
import HeroImage from "../assets/img1.png";
import CategoriesPage from "./category";
import NewArrivals from "./newarrival";
import ProductCards from "./productcards";
import InfoSection from "./info";

export default function Home() {
  return <div>
    <section className="relative bg-gradient-to-b from-green-50 to-white py-32 overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Velora <span className="text-green-600">Fashion</span> Landing
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Sustainable fashion, crafted with care and style. Feel confident in eco-friendly designs.
          </p>
          <div className="space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
              Shop Now
            </button>
            <button className="border-2 border-green-600 px-6 py-3 rounded-lg font-semibold text-green-600 hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image with overlay animated badges */}
        <div className="md:w-1/2 relative mt-10 md:mt-0">
          <img
            src={HeroImage}
            alt="Hero"
            className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="absolute top-10 left-10 bg-white bg-opacity-90 text-green-700 font-bold px-5 py-2 rounded-full shadow-lg text-sm md:text-base"
          >
            New Collection 2025
          </motion.div>

          {/* Floating Badge 2 */}
          <motion.div
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="absolute bottom-10 right-10 bg-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-lg text-sm md:text-base"
          >
            Free Shipping Worldwide
          </motion.div>

          {/* Floating Badge 3 */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="absolute top-1/2 right-10 bg-pink-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg text-sm md:text-base"
          >
            Limited Edition
          </motion.div>

          {/* Floating Badge 4 */}
          {/* <motion.div
            animate={{ x: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
            className="absolute bottom-1/3 left-10 bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-full shadow-lg text-sm md:text-base"
          >
            50% Off Today
          </motion.div> */}
        </div>
      </div>

      {/* Floating shapes for design flair */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full translate-x-32 translate-y-32"></div>
    </section>
  <CategoriesPage/> 
  <InfoSection/>
</div>

}
