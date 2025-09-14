import React from "react";
import AboutImage from "../assets/img2.png"; // Replace with your image

export default function AboutUs() {
  return (
    <section className="relative bg-white py-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            About <span className="text-green-600">Velora Fashion</span>
          </h2>
          <p className="text-gray-700 text-lg">
            Velora Fashion is committed to sustainable and eco-friendly fashion. 
            We craft stylish clothing with care, ensuring each piece is not only 
            beautiful but also responsible for the environment.
          </p>
          <p className="text-gray-700 text-lg">
            Our mission is to empower our customers to feel confident and stylish 
            while making choices that are kind to the planet.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Learn More
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={AboutImage}
            alt="About Velora"
            className="rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
      </div>

      {/* Optional floating shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-100 rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-200 rounded-full translate-x-32 translate-y-32"></div>
    </section>
  );
}
