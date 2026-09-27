import React, { useContext, useState } from "react";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { MyStore } from "../context/Context";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
  const {
    register,
    handleSubmit, 
    reset,
     
  } = useForm();

  let {loggedInUser, setLoggedInUser, registerUser} = useContext(MyStore);
  const loginHandler = (data) => {
    let isUserRegister = registerUser.find(user=> user.email == data.email)
    if(!isUserRegister){
        toast.error("User doesnot exist!")
        reset()
        return
    }
    if(isUserRegister.email !== data.email && isUserRegister.password !== data.password){
        toast.error("Invalid Username or Password!")
        reset()
        return
    }
    if(Object.keys(loggedInUser).length !== 0 ){
        toast.error("User already LogedIn")
        navigate("/")
        reset()
        return
    }
    setLoggedInUser(isUserRegister)
    localStorage.setItem("LogedInUser", JSON.stringify(isUserRegister))
    reset()
    toast.success("User LogedIn successfully!")
    navigate("/")
  };
  return (
    <main className="min-h-screen bg-[#F8F9F5] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className=" w-14 h-14 rounded-2xl bg-[#C8FF00] flex items-center justify-center shadow-sm">
            <Zap size={28} className="text-[#111111]" fill="currentColor" />
          </div>

          <h1 className=" mt-5 text-3xl font-extrabold text-[#111111]">
            Welcome Back
          </h1>

          <p className=" mt-2 text-sm  text-gray-500 text-center">
            Login to your SkyMart account and continue shopping.
          </p>
        </div>

        <div className=" mt-8  bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">

          <form className="space-y-5" onSubmit={handleSubmit(loginHandler)}>
            <div>
              <label className=" block mb-2 text-sm font-semibold text-[#111111]">
                Email
              </label>

              <div className="relative">
                <Mail size={18} className=" absolute left-4 top-1/2 -translate-y-1/2  text-gray-400"/>

                <input {...register("email", { required: true })} type="email" placeholder="Enter your email" className=" w-full h-12 pl-11 pr-4 rounded-xl  bg-[#F8F9F5] borderborder-gray-200   text-sm   text-[#111111] placeholder:text-gray-400   outline-none  focus:border-[#C8FF00]  focus:ring-2 focus:ring-[#C8FF00]/20 transition-all "/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className=" text-sm font-semibold text-[#111111]">
                  Password
                </label>

                <button type="button" className=" text-xs font-semibold text-gray-500 hover:text-[#A8D900] transition-colors">
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                <input {...register("passowrd", { required: true })} type={showPassword ? "text" : "password"} placeholder="Enter your password" className="w-full h-12 pl-11 pr-12 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20 transition-all"/>

                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111]"> {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

           
            <button type="submit" className="w-full h-12 mt-2 rounded-xl bg-[#C8FF00] text-[#111111] flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#A8D900] transition-colors">
              Login
              <ArrowRight size={18} />
            </button>
          </form>

          <div className=" mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <NavLink to="/auth/signup" className="font-bold text-[#111111] hover:text-[#A8D900] transition-colors">
                Create Account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
