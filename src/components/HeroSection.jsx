import React from 'react';
import { Button } from "./ui/button.jsx";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#0f2557]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Export with Confidence
            </h1>
            <p className="mx-auto max-w-[700px] text-[#a8c0ff] md:text-xl">
              Your gateway to successful exporting to the US and European Union. Get the information and support you need.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-white text-[#183473] hover:bg-[#e6e6e6]">Get Started</Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#183473]">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;