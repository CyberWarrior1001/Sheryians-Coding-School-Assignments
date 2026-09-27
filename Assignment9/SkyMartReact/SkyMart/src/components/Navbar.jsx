import React, { useContext } from "react";
import { Zap, LogOut, ChevronDown, ShoppingCartIcon } from "lucide-react";
import { Navigate, NavLink } from "react-router";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const Navbar = () => {
  let { loggedInUser, setLoggedInUser } = useContext(MyStore);
  const { setIsOpenSideBar } = useContext(MyStore);

  const logoutHandler = () => {
    console.log("Logging out... ");
    setLoggedInUser({});
    localStorage.setItem("LogedInUser", JSON.stringify({}));
    console.log("testing LogoutHandler ");
    toast.success("LogOut successfully!");
    return <Navigate to="/auth/login" />;
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex-shrink-0">
          <NavLink to="/" className="flex items-center gap-2.5 group">
            
            <div className=" w-10 h-10 rounded-xl bg-[#C8FF00] flex items-center justify-center transition-all duration-300 group-hover:rounded-lg group-hover:rotate-3">
              <Zap size={19} strokeWidth={2.5} className="text-[#111111] fill-[#111111]"
              />
            </div>
 
            <span
              className="text-xl font-bold tracking-tight text-[#111111]">
              Sky<span className="text-[#A8D900]">Mart</span>
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) =>` relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200

                ${
                  isActive
                    ? "text-[#111111] bg-[#C8FF00]/20"
                    : "text-gray-500 hover:text-[#111111] hover:bg-gray-100"
                }
                `
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className=" flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition group">
            <div className=" w-9 h-9 rounded-full bg-[#111111] text-[#C8FF00] flex items-center justify-center text-xs font-bold tracking-wide group-hover:bg-[#C8FF00] group-hover:text-[#111111] transition-colors"> {loggedInUser.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#111111]">
                {loggedInUser.name}
              </p>

              <p className="text-xs text-gray-400">Customer</p>
            </div>
          </button>

          <button onClick={() => setIsOpenSideBar(true)} className=" w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#C8FF00] hover:bg-gray-900 transition-all">
            <ShoppingCartIcon size={18} />
          </button>

          
          <div className="hidden sm:block w-px h-7 bg-gray-200" />

          <button onClick={logoutHandler} type="button" className=" w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
