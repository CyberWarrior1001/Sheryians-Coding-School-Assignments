import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { MyStore } from "../context/Context";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  let {registerUser, setRegisterUser} = useContext(MyStore);

  const handleSignup = (data)=>{
    console.log("The signup data is --> ", data)
    if(data.password !== data.confirmpassword){
        toast.warning("Password does not matched.")
        reset()
        return;
    }
    let isUserAlreadyExist = registerUser.find(user => user.email == data.email)
    if(isUserAlreadyExist){
        toast.warning("User Already Exist!")
        reset()
        return;
    }
    let user = {...data, id: crypto.randomUUID(), }
    let addUser = [...registerUser, user]
    setRegisterUser(addUser)
    localStorage.setItem("RegisteredUsers", JSON.stringify(addUser))
    reset()
    toast.success("User Registered Successfully!")
    navigate("/auth/login")
  }
  return (
    <main className="min-h-screen bg-[#F8F9F5] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
         
        <div className="flex flex-col items-center">
          <div className=" w-14 h-14 rounded-2xl bg-[#C8FF00] flex items-center justify-center shadow-sm">
            <Zap size={28} className="text-[#111111]" fill="currentColor" />
          </div>

          <h1 className=" mt-5 text-3xl font-extrabold text-[#111111]">
            Create your account
          </h1>

          <p className=" mt-2 text-sm text-gray-500 text-center">
            Join SkyMart and start shopping smarter.
          </p>
        </div>

    
        <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit(handleSignup)}>
           
            <div>
              <label className=" block mb-2 text-sm font-semibold text-[#111111]">
                Username
              </label>

              <div className="relative">
                <User size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                <input {...register("name", { required: true })} type="text" placeholder="Enter your username" className=" w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20 transition-all"/>
              </div>
            </div>

           
            <div>
              <label className=" block mb-2 text-sm font-semibold text-[#111111]">
                Email
              </label>

              <div className="relative">
                <Mail size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                <input {...register("email", { required: true })} type="email" placeholder="Enter your email" className=" w-full h-12 pl-11 pr-4 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20 transition-all"/>
              </div>
            </div>

           
            <div>
              <label className=" block mb-2 text-sm font-semibold text-[#111111]">
                Password
              </label>

              <div className="relative">
                <Lock size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

                <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} placeholder="Create a password" className=" w-full h-12 pl-11 pr-12 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20 transition-all"/>

                <button type="button" onClick={() => setShowPassword(!showPassword)} className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

          
            <div>
              <label className=" block mb-2 text-sm font-semibold text-[#111111]">
                Confirm Password
              </label>

              <div className="relative">
                <Lock size={18} className=" absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "/>

                <input {...register("confirmpassword", { required: true })} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className=" w-full h-12 pl-11 pr-12 rounded-xl bg-[#F8F9F5] border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 outline-none focus:border-[#C8FF00] focus:ring-2 focus:ring-[#C8FF00]/20 transition-all"/>

                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className=" absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111]">
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

             
            <button type="submit" className=" w-full h-12 mt-2 rounded-xl bg-[#C8FF00] text-[#111111] flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#A8D900] transition-colors">
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

           
          <div className=" mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?
              <NavLink to="/auth/login" className=" font-bold text-[#111111] hover:text-[#A8D900] transition-colors">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
