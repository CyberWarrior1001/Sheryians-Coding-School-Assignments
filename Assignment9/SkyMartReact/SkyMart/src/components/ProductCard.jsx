import { Check, ShoppingCart, Star } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, setAddToCart } = useContext(MyStore);

  const addToCartHandler = (e) => {
    e.stopPropagation();
    let updatedProduct = { ...product, qty: 1 };
    let cartArr = [...addToCart, updatedProduct];
    setAddToCart(cartArr);
    localStorage.setItem("cartDb", JSON.stringify(cartArr));
    toast.success("Producted Added to cart successfully!");
  };

  return (
    <div
      onClick={() => {
        navigate(`details/${product.id}`);
      }}
      key={product.id}
      className="cursor-pointer group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#C8FF00] hover:shadow-lg transition-all duration-200">
      <div className=" h-56 bg-[#F8F9F5] flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.name} className=" w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"/>
      </div>

      <div className="p-4">
        <p className=" text-[11px] font-semibold uppercase tracking-wider text-[#A8D900]">
          {product.category}
        </p>

        <h2 className=" mt-1 text-base font-bold text-[#111111] line-clamp-1">
          {product.title}
        </h2>

   
        <div className="mt-2 flex items-center gap-1">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />

          <span className="text-sm font-semibold text-gray-700">
            {product.rating.rate}
          </span>

          <span className="text-xs text-gray-400">
            ({product.rating.count})
          </span>
        </div>

        <div className=" mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold text-[#111111]">
            ${product.price.toFixed(2)}
          </span>

          {addToCart.find((cart) => cart.id == product.id) ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-row gap-3 bg-[#111111] text-[#C8FF00] p-2.5 rounded-2xl font-bold hover:bg-[#C8FF00] hover:text-[#111111] transition-all duration-200">
              Added <Check />
            </div>
          ) : (
            <button onClick={addToCartHandler} className="w-10 h-10 rounded-xl bg-[#C8FF00] text-[#111111] flex items-center justify-center hover:bg-[#A8D900] transition-colors">
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
