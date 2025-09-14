import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCards() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("womens"); // default category
  const navigate = useNavigate();

  // Add product to localStorage
  const handlestoredata = (data) => {
    const newdata = JSON.parse(localStorage.getItem("product")) || [];
    const existid = newdata.some((item) => item._id === data._id);
    if (!existid) {
      newdata.push(data);
      localStorage.setItem("product", JSON.stringify(newdata));
    }
  };

  // Fetch products based on selected category
  useEffect(() => {
    if (!category) return;

    axios
      .post("http://localhost:1000/read/product", { category })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  const handleEdit = (id) => navigate(`/updateproduct/${id}`);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1000/delete/product/${id}`)
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {/* Category Filter - radio buttons */}
      <div className="space-x-5 text-2xl text-center mb-5 flex justify-center gap-6">
        {["womens", "men", "kids"].map((cat) => (
          <label key={cat} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={(e) => setCategory(e.target.value)}
              className="accent-purple-600"
            />
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:1000/alldocs/${product.primage}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <div className="flex justify-between">
                <p className="text-gray-600 mb-1">Price: ${product.price}</p>
                <p
                  className={`mb-2 ${
                    product.status === "avariable"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.status}
                </p>
              </div>

              {/* Product documents */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.docs?.map((doc, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:1000/alldocs/${doc}`}
                    alt={`Doc ${idx + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => handlestoredata(product)}
                  disabled={product.status !== "avariable"}
                  className={`px-3 py-1 rounded text-white ${
                    product.status !== "avariable"
                      ? "bg-gray-600 line-through"
                      : "bg-purple-600 hover:bg-green-700 transition"
                  }`}
                >
                  Add
                </button>
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
