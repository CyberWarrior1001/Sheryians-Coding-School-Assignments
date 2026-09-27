
import React from "react";
import { Zap, Mail, ArrowRight } from "lucide-react";
import { NavLink } from "react-router";


const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] text-white">

      
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#C8FF00] flex items-center justify-center">
                <Zap size={22} strokeWidth={2.5} className="text-[#111111]" fill="currentColor"/>
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight">
                Sky<span className="text-[#C8FF00]">Mart</span>
              </h2>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-400 max-w-xs">
              Your everyday marketplace for quality products, great prices,
              and a smooth shopping experience.
            </p>

            {/* Social Icons */}
            {/* <div className="flex items-center gap-3 mt-6">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <button
                  key={index}
                  className="
                    w-10 h-10 rounded-xl
                    bg-white/5 border border-white/10
                    flex items-center justify-center
                    text-gray-400
                    hover:bg-[#C8FF00]
                    hover:text-[#111111]
                    hover:border-[#C8FF00]
                    transition-all duration-200
                  "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div> */}
          </div>

          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 mt-5">
              <NavLink to="/" className="text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Home
              </NavLink>

              <NavLink to="/shop" className="text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Shop
              </NavLink>

              <NavLink to="/about" className="text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                About Us
              </NavLink>

              <NavLink to="/cart" className="text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Shopping Cart
              </NavLink>
            </div>
          </div>

           
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Customer Service
            </h3>

            <div className="flex flex-col gap-3 mt-5">
              <button className="text-left text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Contact Us
              </button>

              <button className="text-left text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Shipping & Delivery
              </button>

              <button className="text-left text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                Returns & Refunds
              </button>

              <button className="text-left text-sm text-gray-400 hover:text-[#C8FF00] transition-colors">
                FAQs
              </button>
            </div>
          </div>

           
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Stay Updated
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Subscribe to get the latest products, deals, and updates.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="relative flex-1">
                <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>

                <input type="email" placeholder="Your email" className="w-full h-11 pl-10 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#C8FF00]"/>
              </div>

              <button className="w-11 h-11 shrink-0 rounded-xl bg-[#C8FF00] text-[#111111] flex items-center justify-center hover:bg-[#A8D900] transition-colors">
                <ArrowRight size={19} />
              </button>
            </div>
          </div>

        </div>

        
        <div className="my-10 h-px bg-white/10" />

        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2026 SkyMart. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <button className="text-xs text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </button>

            <button className="text-xs text-gray-500 hover:text-white transition-colors">
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
