import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export let MyStore = createContext();

const Contaxt = ({ children }) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("ProductsDb")) || [] );
  const [addToCart, setAddToCart] = useState(
    JSON.parse(localStorage.getItem("cartDb")) || [],
  );
  const [registerUser, setRegisterUser] = useState(
    JSON.parse(localStorage.getItem("RegisteredUsers")) || [],
  );

  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("LogedInUser")) || {},
  );
  

  return (
    <MyStore.Provider
      value={{
        isOpenSideBar,
        setIsOpenSideBar,
        products,
        setProducts,
        addToCart,
        setAddToCart,
        registerUser,
        setRegisterUser,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};

export default Contaxt;
