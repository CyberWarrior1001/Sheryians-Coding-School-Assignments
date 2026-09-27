 
import React from "react";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  Gauge,
  Heart,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router";
 

const About = () => {
  const stats = [
    {
      icon: Package,
      value: "20K+",
      label: "Products",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Avg. Rating",
    },
    {
      icon: Truck,
      value: "99%",
      label: "On-time Delivery",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Trust",
      description:
        "Every product is verified for quality and authenticity before listing.",
    },
    {
      icon: Gauge,
      title: "Speed",
      description:
        "We obsess over delivery times so your orders arrive when promised.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Built around real customer feedback, not just business metrics.",
    },
    {
      icon: BadgeCheck,
      title: "Quality",
      description:
        "We curate the best — no filler, no junk, just great products.",
    },
  ];

  const team = [
    {
      initials: "AA",
      name: "Awais Ahmad",
      role: "Founder & CEO"
    },
    {
      initials: "AS",
      name: "Amir Sohail",
      role: "Head of Product"
    },
    {
      initials: "OA",
      name: "Oumair Ahmad",
      role: "Lead Engineer"
    },
    {
      initials: "MS",
      name: "Muhammad Shayan",
      role: "Design Director"
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9F5]">
      <div className="max-w-5xl mx-auto px-6 py-16">

         <section className="flex flex-col items-center text-center">

           <div className="w-16 h-16 rounded-2xl bg-[#C8FF00] flex items-center justify-center shadow-sm">
            <Zap size={32} strokeWidth={2.5} className="text-[#111111]" fill="currentColor"/>
          </div>

         
          <h1 className=" mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            About <span className="text-[#A8D900]">SkyMart</span>
          </h1>

          <p className=" mt-5 max-w-2xl text-base md:text-lg leading-7 text-gray-500">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </section>


        <section className=" mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#C8FF00] hover:shadow-md transition-all duration-200">
                <div className=" w-12 h-12 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center">
                  <Icon size={23} className="text-[#111111]"/>
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-[#111111]">
                  {stat.value}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </section>


        <section className="mt-14 bg-white border border-gray-200 rounded-3xl p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#111111]">
            Our Story
          </h2>

          <div className=" mt-5 space-y-4 text-sm md:text-base leading-7 text-gray-500">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked
              ourselves: what if shopping online was actually enjoyable?
            </p>

            <p>
              Three years later, SkyMart serves over 50,000 customers across
              the country. We stock electronics, fashion, jewelry, and
              everyday essentials — all at prices that don't require a second
              mortgage.
            </p>

            <p>
              We're still the same team at heart: obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>
        </section>


         <section className="mt-16">

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#A8D900]">
              Our Values
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#111111]">
              What We Stand For
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div key={index} className=" bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#C8FF00] hover:shadow-md transition-all duration-200">
                  <div className="w-11 h-11 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center">
                    <Icon size={21} className="text-[#111111]"/>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#111111]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>


        <section className="mt-16">

          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#111111]">
              Meet the Team
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              The people behind the SkyMart experience.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#C8FF00] hover:shadow-md transition-all duration-200">
                
                <div className="  w-16 h-16 rounded-2xl bg-[#111111] text-[#C8FF00] flex items-center justify-center text-lg font-extrabold">
                  {member.initials}
                </div>

                <h3 className="mt-4 text-base font-bold text-[#111111]">
                  {member.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>


        <section className="mt-16 bg-[#111111] rounded-3xl px-6 py-10 md:px-10 flex flex-col items-center text-center">
          <h2 className=" text-3xl font-extrabold text-white">
            Ready to shop?
          </h2>

          <p className=" mt-3 text-sm md:text-base text-gray-400">
            Explore thousands of products at unbeatable prices.
          </p>

          <NavLink to="/shop" className=" mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C8FF00] text-[#111111] text-sm font-bold hover:bg-[#A8D900] transition-colors">
            Browse Products
            <ArrowRight size={18} />
          </NavLink>
        </section>

      </div>
    </main>
  );
};

export default About;
 