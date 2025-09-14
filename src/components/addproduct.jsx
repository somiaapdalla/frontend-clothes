import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";

function Product() {
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState("");
  const [image, setimage] = useState("");

  const navigate = useNavigate();

  const handlepost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("img", image);

    axios.post("http://localhost:1000/create/product", formData)
      .then(() => {
        alert("✅ Product added successfully!");
        navigate("/product");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64">
        <Dashboard />
      </div>

      {/* Main Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form
          onSubmit={handlepost}
          className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-5"
        >
          <h2 className="text-3xl font-bold text-center text-green-600">
            Add Product
          </h2>

          {/** Product Name */}
          <div>
            <label className=" mb-1 text-gray-700 font-medium">
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/** Quantity */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Quantity
            </label>
            <input
              value={quantity}
              onChange={(e) => setquantity(e.target.value)}
              type="number"
              placeholder="Enter quantity"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/** Price */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Price
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/** Category */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Category
            </label>
            <input
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              type="text"
              placeholder="Enter category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
          </div>

          {/** Image */}
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Image
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
              onChange={(e) => setimage(e.target.files[0])}
              type="file"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Product;
