 
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  PackageOpen,
  ShoppingCart,
  ArrowUpDown,
} from "lucide-react";
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import { MyStore } from "../context/Context";
import { useNavigate, useParams, useSearchParams } from "react-router";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const navigate = useNavigate()
  
  let {products} = useContext(MyStore)
    const [searchParams] = useSearchParams();

  
  let query = searchParams.get("category")
    if(query){
       products = products.filter(prod => prod.category.includes(query))
    }
    
  const filteredProducts = useMemo(() => {
    let result = [...products];

   
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue) ||
          product.category.toLowerCase().includes(searchValue)
      );
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) => product.category.includes(category)
      );
    }

    // Sort
    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.name));
    }

    return result;
  }, [search, category, sort]);

  
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("featured");
  };

  const hasFilters =
    search.trim() !== "" ||
    category !== "all" ||
    sort !== "featured";

  return (
    <main className="min-h-screen bg-[#F8F9F5]">

      <div className="max-w-7xl mx-auto px-6 py-12"> 
 
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#A8D900]">
            Explore
          </p>

          <h1 className=" mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            All Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>
        </div>

 
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-4">

          <div className="flex flex-col lg:flex-row gap-3">
 
            <div className="relative flex-1">

              <Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className=" w-full h-12 pl-11 pr-10 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20"/>

              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111]">
                  <X size={18} />
                </button>
              )}
            </div>


            <div className="relative">

              <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 w-full lg:w-52 px-4 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] outline-none focus:border-[#C8FF00] cursor-pointer appearance-none">
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="home">Home</option>
                <option value="sports">Sports</option>
                <option value="accessories">Accessories</option>
              </select>

              <SlidersHorizontal size={17} className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>


            <div className="relative">

              <select value={sort} onChange={(e) => setSort(e.target.value)} className=" h-12 w-full lg:w-52 px-4 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] outline-none focus:border-[#C8FF00] cursor-pointer appearance-none">
                <option value="featured">Featured</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="name">
                  Name: A to Z
                </option>
              </select>

              <ArrowUpDown size={17} className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>

          </div>


          {hasFilters && (
            <div className=" mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">

              <span className=" text-xs font-medium text-gray-500 mr-1">
                Active filters:
              </span>


              
              {search.trim() && (
                <div className=" inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8FF00]/20 text-[#111111] text-xs font-semibold">
                  {search}
                  <button onClick={() => setSearch("")} className=" hover:text-red-500 transition-colors ">
                    <X size={14} />
                  </button>
                </div>
              )}


           
              {category !== "all" && (
                <div className=" inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8FF00]/20 text-[#111111] text-xs font-semibold">
                  {category}

                  <button onClick={() => setCategory("all")} className=" hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              )}


              
              <button onClick={clearFilters} className="ml-auto text-xs font-semibold text-gray-500 hover:text-red-500 transition-colors">
                Clear Filters
              </button>

            </div>
          )}

        </div>


   
        {filteredProducts.length > 0 ? (

          <div className=" mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

            {filteredProducts.map((product) => (

              <ProductCard  product={product} key={product.id}/>

            ))}

          </div>

        ) : (

      
          <div className=" mt-8 min-h-[400px] bg-white border border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center px-6">

            <div className=" w-16 h-16 rounded-2xl bg-[#F8F9F5] flex items-center justify-center">
              <PackageOpen size={30} className="text-gray-400"/>
            </div>

            <h2 className=" mt-5 text-xl font-bold text-[#111111]">
              Product not found
            </h2>

            <p className=" mt-2 max-w-sm text-sm leading-6 text-gray-500">
              We couldn't find any products matching your
              current filters. Try searching for something else.
            </p>

            <button onClick={clearFilters} className=" mt-6 px-5 py-3 rounded-xl bg-[#111111] text-white text-sm font-semibold hover:bg-[#C8FF00] hover:text-[#111111] transition-colors">
              Clear Filters
            </button>

          </div>

        )}

      </div>

    </main>
  );
};

export default Shop;
 
