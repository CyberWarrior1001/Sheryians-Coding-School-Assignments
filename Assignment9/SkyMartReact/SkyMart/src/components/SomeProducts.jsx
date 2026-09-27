import React, { useContext } from "react";

import { ShoppingCart, ArrowRight, Star, Ticket, Check } from "lucide-react";

import { NavLink, useNavigate } from "react-router";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const SomeProducts = ({ titleIco, title, nevagation_address, products }) => {
  const navigate = useNavigate();
  const { addToCart, setAddToCart } = useContext(MyStore);

  const addToCartHandler = (e, id) => {
    e.stopPropagation();
    let product = products.filter((prod) => prod.id == id);
    let updatedProduct = { ...product[0], qty: 1 };
    let cartArr = [...addToCart, updatedProduct];
    setAddToCart(cartArr);
    localStorage.setItem("cartDb", JSON.stringify(cartArr));
    toast.success("Producted Added to cart successfully!");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className=" w-10 h-10 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center text-lg ">
            {titleIco}
          </div>

          <h2 className=" text-2xl md:text-3xl font-bold text-[#111111] tracking-tight ">
            {title}
          </h2>
        </div>

        <NavLink
          to={nevagation_address}
          className=" group flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#A8D900] transition-colors "
        >
          See all
          <ArrowRight
            size={17}
            className=" group-hover:translate-x-1 transition-transform "
          />
        </NavLink>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              navigate(`/shop/details/${product.id}`);
            }}
            className=" group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#C8FF00] hover:shadow-lg transition-all duration-300 "
          >
            {/* Product Image */}
            <div className=" relative w-full h-52 bg-[#F8F9F5] flex items-center justify-center overflow-hidden ">
              <img
                src={product.image}
                alt={product.name}
                className=" w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300 "
              />
            </div>

            <div className="p-4">
              <h3 className=" text-base font-semibold text-[#111111] truncate ">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                <Star size={15} className="fill-yellow-400 text-yellow-400" />

                <span className="text-sm font-semibold text-gray-700">
                  {product.rating.rate}
                </span>

                <span className="text-xs text-gray-400">
                  ({product.rating.count})
                </span>
              </div>

              <div className=" mt-3 flex items-center justify-between ">
                <div>
                  <p className=" text-lg font-bold text-[#111111] ">
                    ${product.price}
                  </p>
                </div>
                {addToCart.find((cart) => cart.id == product.id) ? (
                  <div onClick={(e)=> e.stopPropagation()} className="flex flex-row gap-3 bg-[#111111] text-[#C8FF00] p-2.5 rounded-2xl font-bold hover:bg-[#C8FF00] hover:text-[#111111] transition-all duration-200">
                    Added <Check />
                  </div>
                ) : (
                  <button
                    onClick={(e) => addToCartHandler(e, product.id)}
                    type="button"
                    title="Add to cart"
                    className=" w-10 h-10 rounded-xl bg-[#111111] text-[#C8FF00] flex items-center justify-center hover:bg-[#C8FF00] hover:text-[#111111] transition-all duration-200 "
                  >
                    <ShoppingCart size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SomeProducts;
