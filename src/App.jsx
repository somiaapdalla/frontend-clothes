import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import CreateProduct from "./components/product";
import Sadnav from "./components/sidenav";
import Home from "./components/home";
import HeaderBookStore from "./components/headar";
import Footer from "./components/footer";
import AboutUs from "./components/about";
import Contact from "./components/contact";
import Product from "./components/addproduct";
import ProductCards from "./components/collection";
import Login from "./components/login";
import Register from "./components/registration";
import UpdateProduct from "./components/updateproduc";
import CartPage from "./components/cartpage";
import CustomerView from "./components/customerview";
import ReportPage from "./components/report";
import ProtectedRoute from "./components/ProtectedRoute";
import ContactView from "./components/contactview";
import OutfitGenerator from "./components/aotfitgenetor";
import AvatarScene from "./components/avatarscene";




function App() {
  return (
    <div className="app">
    <HeaderBookStore/>

      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoute >
          <Dashboard />
          </ProtectedRoute>
          }/>

        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add product" element={<Product />} />
          <Route path="/product" element={<CreateProduct />} />
          <Route path="/productcards" element={<ProductCards />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/customer" element={<CustomerView />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/view" element={<ContactView />} />
          <Route path="/outfit" element={<OutfitGenerator />} />
          <Route path="/avatar" element={<AvatarScene />} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
