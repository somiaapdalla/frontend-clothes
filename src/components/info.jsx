import React from "react";

export default function InfoSection() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* 3 Policy Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Item 1 */}
          <div>
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="font-bold text-lg">Easy Exchange Policy</h3>
            <p className="text-gray-500">We offer hassle free exchange policy</p>
          </div>
          {/* Item 2 */}
          <div>
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg">7 Days Return Policy</h3>
            <p className="text-gray-500">We provide 7 days free return policy</p>
          </div>
          {/* Item 3 */}
          <div>
            <div className="text-4xl mb-3">🎧</div>
            <h3 className="font-bold text-lg">Best customer support</h3>
            <p className="text-gray-500">We provide 24/7 customer support</p>
          </div>
        </div>

        {/* Subscribe Section */}
        <h2 className="text-xl font-semibold mb-2">
          Subscribe now & get <span className="text-red-500">20% off</span>
        </h2>
        <p className="text-gray-500 mb-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 px-4 py-2 rounded-md flex-1"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
