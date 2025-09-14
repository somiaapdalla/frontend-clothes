import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sadnav from "./sidenav";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState("");
  const[image ,setimage] = useState("")

  const params = useParams();
  const navigate = useNavigate();

  // Fetch single product data
  const handleSingleData = () => {
    axios
      .get(`http://localhost:1000/read/singleproduct/${params.id}`)
      .then((res) => {
       setName(res.data.name)
       setQuantity(res.data.quantity)
       setPrice(res.data.price)
       setcategory(res.data.category)
       setimage(res.data.primage)
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching product data ❌");
      });
  };

  useEffect(() => {
    handleSingleData();
  }, []);

  const formData = new FormData()

  formData.append("name" , name)
  formData.append("quantity" , quantity)
  formData.append("price" , price)
  formData.append("category" , category)
  formData.append("img" , image)

  // Update product
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1000/update/product/${params.id}`, {
        "name":name,
        "quantity":quantity,
        "price":price,
      })
      .then(() => {
        alert("Product updated successfully ✅");
        navigate("/create"); // الرجوع لقائمة المنتجات
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating product ❌");
      });
  };

  return (
    <div className="flex h-full">
      <div className="p-6 w-full max-w-md mx-auto">
        <form
          onSubmit={handleUpdate}
          className="bg-white rounded-xl p-5 shadow-md"
        >
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-5">
            Update Product
          </h2>

          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required
          />

          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required
          />

          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required
          />
           <label className="block font-medium mb-1">category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="w-full border rounded-lg p-2 mb-4"
            required
          />
            <label className="block mb-2 font-medium text-gray-700">Image</label>
      <input
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
    onChange={(e) => setimage(e.target.files[0])} // for file upload
    type="file"
    accept="image/*"
    />
    <img
                      src={`http://localhost:1000/allDocs/${image}`}
                      className="w-20 h-20 object-cover rounded mb-5"
                      
                    />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
