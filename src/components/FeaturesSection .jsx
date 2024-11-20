import React from 'react';
import FeatureCard from './FeatureCard ';
import { ShieldCheck, TrendingUp, Truck, Globe2 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { icon: ShieldCheck, title: "Compliance Expertise", description: "Navigate complex regulations with our expert guidance." },
    { icon: TrendingUp, title: "Market Insights", description: "Access up-to-date market trends and opportunities." },
    { icon: Truck, title: "Logistics Support", description: "Streamline your shipping and distribution processes." },
    { icon: Globe2, title: "Global Network", description: "Connect with trusted partners across the US and EU." },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12 text-[#183473]">
          Why Choose Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;