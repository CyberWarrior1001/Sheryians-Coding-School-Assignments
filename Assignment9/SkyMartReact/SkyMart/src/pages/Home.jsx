import React, { useContext } from "react";
import { ArrowRight, ShoppingBag, Truck, Zap, Mail } from "lucide-react";
import UserProdInfo from "../components/UserProdInfo";
import CategoryInfo from "../components/CategoryInfo";
import SomeProducts from "../components/SomeProducts";
import SecondaryFooter from "../components/SecondaryFooter";
import { NavLink } from "react-router";
import { MyStore } from "../context/Context";

const Home = () => {
  // Hardcoded for now — later you can get these from API/auth state
  const {loggedInUser, products} = useContext(MyStore);
   
    const latestProducts  = products.slice(-4)
    const topRatedProducts = [...products]
  .sort((a, b) => b.rating.rate - a.rating.rate)
  .slice(0, 4);
  // Get greeting based on current time
  const currentHour = new Date().getHours();

  let greeting;
  let emoji;

  function greatingKar() {
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
      emoji = "🌅";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
      emoji = "☀️";
    } else if (currentHour >= 17 && currentHour < 21) {
      greeting = "Good Evening";
      emoji = "🌆";
    } else {
      greeting = "Good Night";
      emoji = "🌙";
    }
  }
  greatingKar()
 

  return (
    <main className="min-h-screen bg-[#F8F9F5]">
       <section className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div
          className="
          bg-white
          rounded-3xl
          border border-gray-200
          p-6 md:p-10
          shadow-sm
        "
        >
          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-[1.5fr_1fr]
            gap-10
            items-center
          "
          >
             <div>
              {/* Greeting */}
              <div
                className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                mb-5
                rounded-full
                bg-[#C8FF00]/20
                text-[#111111]
                text-sm
                font-semibold
              "
              >
                <span>{emoji}</span>
                <span>{greeting}</span>
              </div>

               <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-[#111111]">
                Welcome Back, <br />
                <span className="text-[#A8D900]">{loggedInUser.name}!</span>
              </h1>

              {/* Description */}
              <p className=" mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-gray-500">
                Discover today's picks — hand-curated products across
                electronics, fashion, and more.
              </p>

              {/* Buttons */}
              <div className=" mt-8 flex flex-wrap items-center gap-4">
                
                <button className="group  flex  items-center  gap-2 px-6  py-3 rounded-x bg-[#111111] text-[#C8FF00]  font-semibold  hover:bg-[#222222]  transition-all"
                >
                  <ShoppingBag size={18} />
                  Shop Now
                  <ArrowRight
                    size={17}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </button>

                 <button
                  className="
                    px-6
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    text-[#111111]
                    font-semibold
                    hover:border-[#C8FF00]
                    hover:bg-[#C8FF00]/10
                    transition-all
                  "
                >
                  View All Products
                </button>
              </div>
            </div>

             <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-1
              gap-4
            "
            >
              {/* Products Card */}
              <div
                className="
                group
                rounded-2xl
                bg-[#111111]
                p-6
                min-h-32
                flex
                flex-col
                justify-between
                transition-transform
                hover:-translate-y-1
              "
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#C8FF00]
                  flex
                  items-center
                  justify-center
                "
                >
                  <ShoppingBag size={19} className="text-[#111111]" />
                </div>

                <div className="mt-5">
                  <p
                    className="
                    text-2xl
                    font-bold
                    text-white
                  "
                  >
                    20+
                  </p>

                  <p
                    className="
                    text-sm
                    text-gray-400
                  "
                  >
                    Products Available
                  </p>
                </div>
              </div>

              {/* Delivery Card */}
              <div
                className="
                group
                rounded-2xl
                bg-[#C8FF00]
                p-6
                min-h-32
                flex
                flex-col
                justify-between
                transition-transform
                hover:-translate-y-1
              "
              >
                <div
                  className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#111111]
                  flex
                  items-center
                  justify-center
                "
                >
                  <Truck size={19} className="text-[#C8FF00]" />
                </div>

                <div className="mt-5">
                  <p
                    className="
                    text-lg
                    font-bold
                    text-[#111111]
                  "
                  >
                    Free Delivery
                  </p>

                  <p
                    className="
                    text-sm
                    text-[#111111]/60
                  "
                  >
                    On orders Rs. 999+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserProdInfo />
      <CategoryInfo />
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <SomeProducts titleIco="🔥" title="New Products" nevagation_address="/shop"   products={latestProducts}/>

        <SomeProducts titleIco="⭐" title="Top Rated" nevagation_address="/shop?sort=rating" products={topRatedProducts}/>
      </div>
      <SecondaryFooter />
    </main>
  );
};

export default Home;
