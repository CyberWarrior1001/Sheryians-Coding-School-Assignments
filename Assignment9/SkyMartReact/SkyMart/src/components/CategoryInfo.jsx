import React, { useContext } from "react";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";
import { MyStore } from "../context/Context";

const CategoryInfo = () => {
  let { products } = useContext(MyStore);
  const categories = [
    {
      name: "Electronics",
      emoji: "💻",
      items: products.filter((product) => product.category === "electronics")
        .length,
    },
    {
      name: "Clothing",
      emoji: "👕",
      items: products.filter(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing",
      ).length,
    },
    {
      name: "Furniture",
      emoji: "🛋️",
      items: products.filter((product) => product.category === "furniture")
        .length,
    },
    {
      name: "Home",
      emoji: "🏠",
      items: products.filter((product) => product.category === "home").length,
    },
    {
      name: "Sports",
      emoji: "⚽",
      items: products.filter((product) => product.category === "sports").length,
    },
    {
      name: "Accessories",
      emoji: "👜",
      items: products.filter((product) => product.category === "jewelery")
        .length,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className=" flex items-end justify-between mb-6">

        <div>
          <p className=" text-sm font-semibold text-[#A8D900] uppercase tracking-wider mb-1">
            Explore
          </p>

          <h2 className=" text-2xl md:text-3xl font-bold text-[#111111] tracking-tight">
            Shop by Category
          </h2>
        </div>

    
        <NavLink to="/shop" className=" hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#111111] hover:text-[#A8D900] transition-colors">
          View All
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1"/>
        </NavLink>
      </div>


      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <NavLink key={category.name} to={`/shop?category=${category.name.toLowerCase()}`} className=" group bg-white border border-gray-200 rounded-2xl p-5 min-h-40 flex flex-col items-center justify-center text-center hover:border-[#C8FF00] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        
            <div className=" w-14 h-14 rounded-2xl bg-[#C8FF00]/15 flex items-center justify-center text-3xl mb-4 group-hover:bg-[#C8FF00] group-hover:scale-110 transition-all duration-300">
              {category.emoji}
            </div>

            
            <h3 className="text-sm md:text-base font-bold text-[#111111]">
              {category.name}
            </h3>


            <p className=" mt-1 text-xs text-gray-400">
              {category.items} items
            </p>
          </NavLink>
        ))}
      </div>

      <div className="flex sm:hidden justify-center mt-5">
        <NavLink to="/shop" className="flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#A8D900]">
          View All
          <ArrowRight size={17} />
        </NavLink>
      </div>
    </section>
  );
};

export default CategoryInfo;
