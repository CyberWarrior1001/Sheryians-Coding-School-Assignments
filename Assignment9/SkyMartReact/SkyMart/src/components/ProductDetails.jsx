import React, { useContext } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";
import { useParams } from "react-router";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const ProductDetails = () => {
  let { id } = useParams();
  console.log(id);
  let { addToCart, setAddToCart, products } = useContext(MyStore);
  const product = products.find((prod) => prod.id == id);
  console.log("the product is --> ", product);

  const addToCartHandler = (e) => {
    e.stopPropagation();
    let updatedProduct = { ...product, qty: 1 };
    let cartArr = [...addToCart, updatedProduct];
    setAddToCart(cartArr);
    localStorage.setItem("cartDb", JSON.stringify(cartArr));
    toast.success("Producted Added to cart successfully!");
  };

  let relatedProducts = products
    .filter((prod) => prod.category == product.category)
    .slice(-4);

  return (
    <main className="min-h-screen bg-[#F8F9F5]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className=" flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <button className=" hover:text-[#111111] transition-colors">
            <ArrowLeft size={16} />
          </button>

          <span>Product</span>

          <span className="text-gray-300">/</span>

          <span>{product.category}</span>

          <span className="text-gray-300">/</span>

          <span className="font-semibold text-[#111111]">{product.title}</span>
        </div>

        <section className=" mt-6 bg-white border border-gray-200 rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className=" min-h-[420px] lg:min-h-[600px] bg-[#F8F9F5] flex items-center justify-center p-8 md:p-12">
              <img src={product.image} alt={product.title} className="w-full h-full max-h-[520px] object-contain rounded-2xl mix-blend-multiply hover:scale-105 transition-transform duration-500"/>
            </div>
            <div className="p-7 md:p-10 lg:p-12">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C8FF00]/20 text-[#111111] text-xs font-bold">
                {product.category}
              </span>
              <h1 className="mt-5 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-[#111111]">
                {product.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className=" text-[#C8FF00] fill-[#C8FF00]"/>
                  ))}
                </div>

                <span className=" text-sm font-bold text-[#111111]">
                  {product.rating.rate}
                </span>

                <span className=" text-sm text-gray-400">
                  ({product.rating.count} reviews)
                </span>
              </div>

            
              <div className="mt-7">
                <span className=" text-3xl font-extrabold text-[#111111]">
                  ${product.price.toFixed(2)}
                </span>
              </div>

             
              <p className=" mt-6 text-sm md:text-base leading-7 text-gray-500">
                {product.description}
              </p>

              {/* Actions */}
              <div className=" mt-8 flex items-center gap-3">
                {addToCart.find((cart) => cart.id == product.id) ? (
                  <div onClick={(e) => e.stopPropagation()} className="flex flex-row gap-3 bg-[#111111] text-[#C8FF00] p-2.5 rounded-2xl font-bold hover:bg-[#C8FF00] hover:text-[#111111] transition-all duration-200">
                    Added <Check />
                  </div>
                ) : (
                  <button
                    onClick={addToCartHandler}
                    className="flex-1 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#C8FF00] hover:text-[#111111] transition-colors"
                  >
                    <ShoppingCart size={19} />
                    Add to Cart
                  </button>
                )}

                <button
                  className="w-12 h-12 shrink-0 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Add to favorites"
                >
                  <Heart size={20} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F8F9F5] rounded-2xl p-4 text-center">
                  <Truck size={21} className="mx-auto text-[#111111]" />

                  <h3 className="mt-3 text-xs font-bold text-[#111111]">
                    Free Delivery
                  </h3>

                  <p className="mt-1 text-gray-500 text-[11px]">
                    On orders $50+
                  </p>
                </div>

                
                <div className=" bg-[#F8F9F5] rounded-2xl p-4 text-center">
                  <ShieldCheck size={21} className="mx-auto text-[#111111]" />

                  <h3 className=" mt-3 text-xs font-bold text-[#111111]">
                    Secure Pay
                  </h3>

                  <p className=" mt-1 text-[11px] text-gray-500">
                    256 bit SSL
                  </p>
                </div>

                <div className=" bg-[#F8F9F5] rounded-2xl p-4 text-center">
                  <RotateCcw size={21} className="mx-auto text-[#111111]" />

                  <h3 className=" mt-3 text-xs font-bold text-[#111111]">
                    Easy Returns
                  </h3>

                  <p className=" mt-1 text-[11px] text-gray-500">
                    30-days policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className=" flex items-end justify-between gap-4">
            <div>
              <p className=" text-xs font-bold uppercase tracking-widest text-[#A8D900]">
                You may also like
              </p>

              <h2 className=" mt-2 text-3xl font-extrabold text-[#111111]">
                Related Products
              </h2>
            </div>
          </div>

          {/* Related Product Cards */}
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  overflow-hidden
                  hover:border-[#C8FF00]
                  hover:shadow-lg
                  transition-all duration-200
                "
              >
                {/* Image */}
                <div
                  className="
                  h-52
                  bg-[#F8F9F5]
                  flex items-center justify-center
                  overflow-hidden
                "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-5
                      group-hover:scale-105
                      transition-transform duration-300
                    "
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    className="
                    text-sm
                    font-bold
                    text-[#111111]
                    line-clamp-1
                  "
                  >
                    {item.name}
                  </h3>

                  <div
                    className="
                    mt-4
                    flex items-center
                    justify-between
                  "
                  >
                    <span
                      className="
                      text-lg
                      font-extrabold
                      text-[#111111]
                    "
                    >
                      ${item.price.toFixed(2)}
                    </span>

                    <button
                      className="
                      w-9 h-9
                      rounded-xl
                      bg-[#C8FF00]
                      text-[#111111]
                      flex items-center justify-center
                      hover:bg-[#A8D900]
                      transition-colors
                    "
                    >
                      <ShoppingCart size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
