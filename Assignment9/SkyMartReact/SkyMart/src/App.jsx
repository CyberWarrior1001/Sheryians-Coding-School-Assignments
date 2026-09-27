import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
 
import Footer from "./components/Footer ";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./MainLayout";
import AuthLayout from "./AuthLayout";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/shop/details/:id" element={<ProductDetails/>}/>
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="signup" element={<SignUp/>}/>
        </Route>
      </Routes>
      
    </div>
  );
};

export default App;
