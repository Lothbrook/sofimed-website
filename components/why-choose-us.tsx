"use client";

import { Box } from "lucide-react";
import { CheckCircle2, Users2, Truck } from "lucide-react";

interface WhyChooseUsProps {
  dict: any;
}

export default function WhyChooseUs({ dict }: WhyChooseUsProps) {
  return (
    <section className="bg-[#0B1120] py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          {dict.whyChooseUs.title}
        </h2>
        <div className="h-1 w-24 bg-red-500 mx-auto mb-6"></div>
        <p className="text-center text-gray-300 mb-16 max-w-3xl mx-auto">
          {dict.whyChooseUs.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">{dict.whyChooseUs.quality.title}</h3>
            <p className="text-gray-300">
              {dict.whyChooseUs.quality.description}
            </p>
          </div>

          <div className="text-center">
            <Users2 className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">{dict.whyChooseUs.expertise.title}</h3>
            <p className="text-gray-300">
              {dict.whyChooseUs.expertise.description}
            </p>
          </div>

          <div className="text-center">
            <Box className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">{dict.whyChooseUs.range.title}</h3>
            <p className="text-gray-300">
              {dict.whyChooseUs.range.description}
            </p>
          </div>

          <div className="text-center">
            <Truck className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">{dict.whyChooseUs.service.title}</h3>
            <p className="text-gray-300">
              {dict.whyChooseUs.service.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}