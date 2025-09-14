import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [active ,setactive] = useState("customer")

  const navigate = useNavigate();

 function handleinsert(e){
    e.preventDefault();
    const url = active === "customer" ? "http://localhost:1000/create/customer" : "http://localhost:1000/create/admin"
    const payload = active === "customer" ? {name:name ,email:email ,phone:phone,  password:password } : {name:name , email:email , password:password}
    axios.post(url,payload).then((res)=>{
        alert( `${active} successfully`);
        navigate("/login");
    }).catch((error) => {
  if(error){
      alert("the amail already exist"); // رسالة الخطأ من السيرفر
  }
})
  }

  

  return (
    <div className="mt-5 mb-5 flex items-center justify-center bg-purple-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center gap-8">
          <button onClick={()=> setactive("customer")} className={`px-12 py-3 rounded-xl ${active === "customer" ? "bg-green-500 text-white" : "border-2 to-black text-black"}`}>Customer</button>
          <button onClick={()=> setactive("admin")} className={`px-12 py-3 rounded-xl ${active === "admin" ? "bg-green-500 text-white" : "border-2 to-black text-black"}`}>Admin</button>
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-6 ">Register</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">{active === "customer" ? "customer Name" : "Admin Name"}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

         

          <div style={{display: active !== "customer" ? "none" : ""}}>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          

          <button
          onClick={handleinsert}
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {active === "customer" ? "Register Customer" : "Rregister AdminS"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-purple-600 font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
