'use client'

import React, { useState, useMemo } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';  // Corrected import
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe } from 'lucide-react';

const faqData = [
  {
    question: "What are the main requirements for exporting to the USA?",
    answer: "Exporting to the USA requires compliance with US Customs and Border Protection regulations. Key requirements include proper documentation (commercial invoice, packing list, bill of lading), adherence to product safety standards, and correct labeling. Certain products may require specific permits or certificates.",
    category: "USA"
  },
  {
    question: "What documentation is needed for exporting to the EU?",
    answer: "For EU exports, essential documents include a commercial invoice, packing list, certificate of origin, and an EUR.1 movement certificate for preferential trade agreements. The EU also requires a customs declaration form (SAD - Single Administrative Document) and, depending on the product, specific certificates such as CE marking for certain goods.",
    category: "EU"
  },
  {
    question: "Are there any specific packaging requirements for USA exports?",
    answer: "Yes, the USA has specific packaging requirements. All wood packaging materials must comply with ISPM 15 standards to prevent the spread of pests. Products must be clearly labeled in English with the country of origin. Certain goods, especially food products, have additional packaging and labeling requirements set by the FDA.",
    category: "USA"
  },
  {
    question: "What are the main differences between exporting to the USA and the EU?",
    answer: "The main differences include customs procedures, product standards, and documentation. The EU has harmonized regulations across member states, while the USA has federal and state-level regulations. The EU often requires CE marking for products, while the USA has its own product safety standards. Tariffs and trade agreements also differ between the two markets.",
    category: "Both"
  },
  {
    question: "Are there any restricted items for export to the EU or USA?",
    answer: "Both the EU and USA have lists of restricted items. Common restrictions include weapons, certain chemicals, and endangered species products. The USA has additional restrictions on technology exports. The EU restricts certain electronic waste and has strict regulations on GMOs. Always check current regulations as they can change.",
    category: "Both"
  },
  {
    question: "How do I handle VAT when exporting to the EU?",
    answer: "When exporting to the EU, goods are generally zero-rated for VAT in the country of export. However, import VAT and possibly customs duties will be charged when the goods enter the EU. The importer is typically responsible for paying these charges. If you're selling B2C, you may need to register for VAT in the destination country under certain conditions.",
    category: "EU"
  },
  {
    question: "What are the main requirements for exporting to the USA?",
    answer: "Exporting to the USA requires compliance with US Customs and Border Protection regulations. Key requirements include proper documentation (commercial invoice, packing list, bill of lading), adherence to product safety standards, and correct labeling. Certain products may require specific permits or certificates.",
    category: "USA"
  },
  {
    question: "What are the main requirements for exporting to the USA?",
    answer: "Exporting to the USA requires compliance with US Customs and Border Protection regulations. Key requirements include proper documentation (commercial invoice, packing list, bill of lading), adherence to product safety standards, and correct labeling. Certain products may require specific permits or certificates.",
    category: "USA"
  },
  {
    question: "What are the main requirements for exporting to the USA?",
    answer: "Exporting to the USA requires compliance with US Customs and Border Protection regulations. Key requirements include proper documentation (commercial invoice, packing list, bill of lading), adherence to product safety standards, and correct labeling. Certain products may require specific permits or certificates.",
    category: "USA"
  },

];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-primary"
      >
        Export FAQ: USA & EU
      </motion.h1>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex gap-2">
          {["All", "USA", "EU", "Both"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {category === "All" && <Globe size={16} />}
              {category}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {filteredFAQs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg overflow-hidden shadow-lg">
                <AccordionTrigger className="w-full px-4 py-2 text-left hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2 bg-gray-100">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
              
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-muted-foreground"
          >
            No matching FAQs found. Please try a different search term or category.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQ;
