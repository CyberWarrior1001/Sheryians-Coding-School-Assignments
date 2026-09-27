import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer ";
import { MyStore } from "./context/Context";
import { toast } from "react-toastify";
 
import SideBar from "./components/SideBar";
import axios from "axios";

const MainLayout = () => {


  let { loggedInUser, setProducts } = useContext(MyStore);
     
  const getProducts = async () => {
    try {
      let res = await axios("https://fakestoreapi.com/products");
      let prod = res.data;
      console.log(prod);
      setProducts(prod);
      localStorage.setItem("ProductsDb", JSON.stringify(prod));
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!")
    }
  };
  useEffect(()=>{
    getProducts()
  }, [])


  if (Object.keys(loggedInUser).length == 0) {
    return <Navigate to="/auth/login" />;
  }


  return (
    <div>
      <Navbar />
      <div className="relative">
        <Outlet />
        <SideBar/>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
