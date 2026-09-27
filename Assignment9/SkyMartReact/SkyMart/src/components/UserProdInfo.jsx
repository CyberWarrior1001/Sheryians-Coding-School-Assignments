import React, { useContext } from "react";
import {
  ShoppingBag,
  DollarSign,
  Star,
  LayoutGrid,
} from "lucide-react";
import { MyStore } from "../context/Context";

const UserProdInfo = () => {
   const { addToCart } = useContext(MyStore);
   let totalCartItems = addToCart.reduce((sum, item) => sum + item.qty, 0);
   const total = addToCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const info = [
    {
      icon: ShoppingBag,
      value: totalCartItems,
      title: "Cart Items in Your Bag",
      description: "Ready to checkout",
    },
    {
      icon: DollarSign,
      value: `$${total.toFixed(2)}`,
      title: "Cart Value",
      description: "Ready to checkout",
    },
    {
      icon: Star,
      value: "5",
      title: "Top Rated Products",
      description: "Highly rated",
    },
    {
      icon: LayoutGrid,
      value: "6",
      title: "Categories",
      description: "To explore",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {info.map((item, index) => {

          const Icon = item.icon;

          return (
            <div key={index} className="group bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:border-[#C8FF00] hover:-translate-y-1 hover:shadow-md transition-all duration-300">

             
              <div className="w-11 h-11 shrink-0 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center group-hover:bg-[#C8FF00] transition-colors">
                <Icon size={20} className="text-[#111111]"/>
              </div>


              <div className="min-w-0">

                <p className="text-xl font-bold text-[#111111]">
                  {item.value}
                </p>

                <p className=" text-sm font-semibold text-[#111111] truncate">
                  {item.title}
                </p>

                <p className=" text-xs text-gray-400 mt-0.5">
                  {item.description}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default UserProdInfo;
