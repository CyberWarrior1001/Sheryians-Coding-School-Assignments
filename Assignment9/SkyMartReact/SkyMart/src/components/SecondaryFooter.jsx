
import React from "react";
import {
  Truck,
  ShieldCheck,
  BadgeDollarSign,
} from "lucide-react";

const SecondaryFooter = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day on select items",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% encrypted checkout",
    },
    {
      icon: BadgeDollarSign,
      title: "Best Price",
      description: "Price-match guarantee",
    },
  ];

  return (
    <section className="w-full bg-white border-y border-gray-200">

      <div className=" max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div key={index} className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl hover:bg-[#F8F9F5] transition-colors">

              <div className="w-12 h-12 shrink-0 rounded-xl bg-[#C8FF00]/20 flex items-center justify-center">
                <Icon size={22} strokeWidth={2} className="text-[#111111]"/>
              </div>


             
              <div>

                <h3 className="text-sm font-bold text-[#111111]">
                  {feature.title}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {feature.description}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default SecondaryFooter;

