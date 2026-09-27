import React, { useContext, useState } from "react";
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const SideBar = () => {
  const { isOpenSideBar, setIsOpenSideBar } = useContext(MyStore);
  const { addToCart, setAddToCart } = useContext(MyStore);
  console.log(addToCart);
 
  // Sheryians Sir there is not stack var in fake store data thats why i didnt set any stock limit
  const increaseQuantity = (id) => {
    let wantedCart = addToCart.map((item) => {
      if (item.id == id) {
        return { ...item, qty: item.qty + 1 };
      } else {
        return item;
      }
    });
    console.log(wantedCart);
    setAddToCart(wantedCart);
    localStorage.setItem("cartDb", JSON.stringify(wantedCart));
  };

  const decreaseQuantity = (id) => {
    let wantedCart = addToCart.map((item) => {
      if (item.id == id) {
        return { ...item, qty: item.qty - 1 };
      } else {
        return item;
      }
    }).filter((item) => item.qty > 0);
    console.log(wantedCart);
    setAddToCart(wantedCart);
    localStorage.setItem("cartDb", JSON.stringify(wantedCart));
  };

  const removeItem = (id) => {
    let updatedArr = addToCart.filter((item)=> item.id !== id)
    setAddToCart(updatedArr);
    localStorage.setItem("cartDb", JSON.stringify(updatedArr));
  };

  const total = addToCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalItems = addToCart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      {isOpenSideBar && (
        <div
          onClick={() => setIsOpenSideBar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60]"
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ${isOpenSideBar ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className=" h-20 px-5 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center">
              <ShoppingCart size={21} className="text-[#111111]" />
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-[#111111]">
                Your Cart
              </h2>

              <p className="text-xs text-gray-500">{totalItems} items</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpenSideBar(false)}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-[#111111] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {addToCart.length > 0 ? (
            <div className="space-y-4">
              {addToCart.map((item) => (
                <div
                  key={item.id}
                  className=" flex gap-4 p-3 rounded-2xl border border-gray-200 bg-white"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 shrink-0 rounded-xl bg-[#F8F9F5] flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className=" w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className=" flex items-start justify-between gap-2">
                      <h3 className=" text-sm font-bold text-[#111111] line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className=" shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-extrabold text-[#111111]">
                      ${item?.price?.toFixed(2)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className=" flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className=" w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>

                        <span className=" w-8 text-center text-xs font-bold text-[#111111]">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-[#C8FF00]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="text-sm font-bold text-[#111111]">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=" h-full flex flex-col items-center justify-center text-center">
              <div className=" w-16 h-16 rounded-2xl bg-[#F8F9F5] flex items-center justify-center">
                <ShoppingCart size={28} className="text-gray-400" />
              </div>

              <h3 className=" mt-5 text-lg font-bold text-[#111111]">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add some products to get started.
              </p>
            </div>
          )}
        </div>

        {addToCart.length > 0 && (
          <div className="shrink-0 border-t border-gray-200 p-5 bg-white">
            {/* Subtotal */}
            <div className=" flex items-center justify-between">
              <span className="text-sm text-gray-500 ">Subtotal</span>

              <span className="text-xl font-extrabold text-[#111111]">
                ${total.toFixed(2)}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>

            <button className="w-full h-12 mt-5 rounded-xl bg-[#C8FF00] text-[#111111] flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#A8D900] transition-colors">
              Checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideBar;
