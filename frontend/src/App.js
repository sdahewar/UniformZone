import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
// import men_banner from "./Components/Assets/banner_mens.png";
// import women_banner from "./Components/Assets/banner_women.png";
// import kid_banner from "./Components/Assets/banner_kids.png";
import cc_banner from "./Components/Assets/img/Cachar.logo.png";
import dbs_banner from "./Components/Assets/img/Don.Bosco.img.png";
import gc_banner from "./Components/Assets/img//GCcollege.png";
import vkv_banner from "./Components/Assets/img/KV.img.png";
import pvm_banner from "./Components/Assets/img/Mandir.img.png";
import nc_banner from "./Components/Assets/img/NC.img.png";
import rgjc_banner from "./Components/Assets/img/rm.img.png";
import About from "./Pages/About";
import Contact from "./Pages/Contact";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />

          <Route
            path="/101"
            element={<ShopCategory banner={cc_banner} category="101" />}
          />
          <Route
            path="/102"
            element={<ShopCategory banner={dbs_banner} category="102" />}
          />
          <Route
            path="/103"
            element={<ShopCategory banner={gc_banner} category="103" />}
          />
          <Route
            path="/104"
            element={<ShopCategory banner={vkv_banner} category="104" />}
          />
          <Route
            path="/105"
            element={<ShopCategory banner={pvm_banner} category="105" />}
          />
          <Route
            path="/106"
            element={<ShopCategory banner={nc_banner} category="106" />}
          />
          <Route
            path="/107"
            element={<ShopCategory banner={rgjc_banner} category="107" />}
          />
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
