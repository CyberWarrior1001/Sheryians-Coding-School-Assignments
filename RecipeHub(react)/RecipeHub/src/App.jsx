import { useState } from "react";
import CartPage from "./AddToCartPage";
import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sideBar";

function App() {
  const [toggle, settoggle] = useState(false);

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Delicious Pasta",
  //     description: "Experience the authentic taste of freshly tossed noodles with premium olive oil, local herbs, and fresh cherry tomatoes.",
  //     price: "$24",
  //     chef: "Chef Mario",
  //     time: "30 mins",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIans-rhbFCtNt3heiNUk2LZ9RXIqSzgRTX__GJsTGOA&s=10m"
  //   }
  // ];

  
  return (
    <>
      <Navbar settoggle={settoggle} noOfCart={cartItems.length} />
    {
      toggle ? (
        <div className="bg-amber-100 min-h-full">
        <CartPage cartItems={cartItems} setCartItems={setCartItems}  />
      </div>
      ) : (
        <div className="border-2 min-h-screen bg-amber-100">
        <div className="mainSite px-10 py-5 grid grid-cols-5 gap-7">
          <Sidebar setProducts={setProducts} />
          <MainContainer products={products} setCartItems={setCartItems} cartItems={cartItems}/>
        </div>
      </div>
      )
    }
      

      
    </>
  );
}

export default App;
