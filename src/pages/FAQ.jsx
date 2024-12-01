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
    answer: " A commercial invoice outlines the sale between the exporter and the EU buyer, detailing the goods, quantities, total value, terms of sale, and currency, helping both the buyer and customs officials with transaction clarity and duty assessments. A packing list itemizes the contents, weight, dimensions, and special instructions for each package, aiding customs and the buyer. A Bill of Lading (B/L) or Airway Bill (AWB) serves as a legal contract, receipt, and proof of ownership for sea or air shipments. Additional documents may include a Certificate of Origin for tariff benefits, an Export License for restricted items, and specific certificates (e.g., phytosanitary or health) for certain goods like plants or food products.",
    category: "EU"
  },
  {
    question: "Are there any specific packaging requirements for USA exports?",
    answer: "Yes, the USA has specific packaging requirements. All wood packaging materials must comply with ISPM 15 standards to prevent the spread of pests. Products must be clearly labeled in English with the country of origin. Certain goods, especially food products, have additional packaging and labeling requirements set by the FDA.",
    category: "USA"
  },

  {
    question: "Which are governing regulatory bodies for the RoSCTL in India?",
    answer: "RoSCTL scheme has been notified by the Ministry of Textiles. However,the scheme shall be implemented by the Department of Revenue",
    category: "Incentives"
  },

  {
    question: "What is a RoSCTL Scheme?",
    answer: "  The RoSCTL Scheme (Rebate of State and Central Taxes and Levies on Export of Garments and Made-ups) replaces the RoSL Scheme to provide rebates on embedded State and Central taxes for garments and made-ups. It aims to enhance the competitiveness of these sectors by offering benefits for apparel (Chapters 61 and 62) and made-ups (Chapter 63), excluding RoDTEP benefits. The scheme was introduced through a Ministry of Textiles notification on March 8, 2019.",
    category: "Incentives"
  },
  {
    question: "What is a  Export-Oriented Units (EOU) Scheme?",
    answer: "The Export-Oriented Units (EOU) Scheme is a government initiative aimed at promoting exports by offering various benefits to units that are set up for the purpose of exporting goods or services. Under this scheme, businesses are required to manufacture or process goods exclusively for export, and they must meet specific export obligations. The key objective of the EOU scheme is to encourage foreign exchange earnings and enhance India’s competitiveness in international markets.  ",
    category: "Incentives"
  },
  {
    question: "What are key-features of Export-Oriented Units (EOU) Scheme?",
    answer: "The Export-Oriented Units (EOU) Scheme offers several benefits to businesses that produce goods exclusively for export. Key features include exemptions from customs and excise duties on imports of capital goods and raw materials, as well as income tax benefits for a specified period. EOUs are required to meet export obligations, typically exporting 100% of their production. Many EOUs operate within Special Economic Zones (SEZs) to enjoy additional advantages, such as duty-free imports and tax exemptions. The scheme also allows EOUs to sell a small portion of their output in the domestic market, helping boost exports and foreign exchange earnings.",
    category: "Incentives"
  },
  {
    question: "Which taxes are intended to be compensated to the exporters inRoSCTL Scheme?",
    answer: "The scheme provides a rebate on State and Central taxes and levies for the export of apparel, garments, and Made-ups, in addition to the Duty Drawback Scheme. The State tax rebates cover VAT on fuel for transportation, captive power, farm sector, mandi tax, electricity duty, stamp duty on export documents, and taxes on inputs like pesticides, fertilizers, and coal. The Central tax rebates include excise duty on transportation fuel, CGST on inputs such as pesticides and fertilizers, taxes on unregistered dealer purchases, and CGST and Compensation Cess on coal for electricity production.",
    category: "Incentives"
  },
  {
    question: " In which form will be the rebate under RoSCTL Scheme given to the exporter?",
    answer: " The rebate under the RoSCTL Scheme shall be given to the exporter inthe form of duty credit scrips which will be maintained in the electronic dutycredit ledger. The scrips shall be issued electronically on Customs automatedsystem.",
    category: "Incentives"
  },
  {
    question: "Who is eligible to take the benefit of the RoSCTL scheme?",
    answer: " All exporters of garments, apparels, and made-ups manufactured in India are eligible for the scheme, except those on the DGFT's Denied Entity List. The RoSCTL benefit is available only if the exporter has not claimed RoDTEP benefits. Both merchant and manufacturer exporters can avail of the scheme, provided the goods are directly exported by them.",
    category: "Incentives"
  },
  {
    question: "Eligibility criteria of the RoDTEP scheme",
    answer: "The RoDTEP scheme is available to all industries, including textiles, with priority given to labor-intensive sectors already benefiting from the MEIS Scheme. Both manufacturer and merchant exporters (traders) can participate, with no minimum revenue requirement for eligibility. However, goods intended for re-export are excluded. To qualify, the exported goods must originate in India. Special Economic Zone Units and Export-Oriented Units are also eligible for the benefits, and the scheme applies to products exported through courier services via e-commerce platforms.",
    category: "Incentives"
  },
  {
    question: "What is Export Promotion Capital Goods (EPCG) Scheme",
    answer: "The Export Promotion Capital Goods (EPCG) Scheme is designed to promote exports by offering exporters the opportunity to import capital goods (machinery, equipment, etc.) at concessional or zero customs duties. To qualify, exporters must meet an export obligation, exporting goods worth a specified multiple of the duty saved within a given time frame, usually six years. The scheme is available to both manufacturers and merchant exporters and aims to encourage technology upgradation, improve production efficiency, and enhance export quality. By reducing the cost of importing advanced machinery, the EPCG scheme helps increase the competitiveness of Indian exports. ",
    category: "Incentives"
  },
  {
    question: "What is an Importer Exporter Code (IEC)?",
    answer: "The importer exporter code is a 10-digit number issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce and Industry, Government of India. It is a unique identification number that is required by importers and exporters to run a seamless business in international trade. ",
    category: "Incentives"
  },

  {
    question: "What is California's state-law regarding packaging materials?",
    answer: "California's SB 54 law aims to reduce plastic and packaging pollution by requiring that all single-use plastic packaging be 100% recyclable or compostable by 2032. The law mandates a 25% reduction in plastic packaging by 2032 and establishes that producers must fund a $5 billion program over ten years to improve recycling infrastructure. Companies can comply by redesigning packaging, reducing materials, or adopting refillable models. Recyclable materials must be accepted by programs serving 60% of the state. Exemptions apply to medical products, hazardous materials, and small businesses with less than $1 million in sales. The law shifts responsibility to producers for waste reduction and recycling.",
    category: "USA"
  },

  {
    question: "What is Washington's state-law regarding plastic materials?",
    answer: "Washington's 2021 plastics law requires producers to include a minimum amount of recycled plastic in their packaging, aiming to reduce the production of new plastic and decrease single-use plastic waste. Product labels must include the manufacturer's name and address, accurate content quantity, product identity, and an ingredient list for processed foods. Additionally, the Universal Product Code (UPC) is an eleven-digit numeric code that helps identify retail consumer packages, facilitating easy checkout, accurate pricing, and sales data collection. This law promotes sustainability by encouraging the use of recycled materials and providing clear product labeling.",
    category: "USA"
  },


  {
    question: "What is EPA in US",
    answer: "The Environmental Protection Agency (EPA) regulates waste management and sets environmental impact standards, focusing on waste reduction, recycling, and sustainable materials. Greenpulse must ensure that the packaging materials it provides do not harm human health or the environment. Additionally, any chemicals used in the manufacturing of packaging must be approved by the EPA, ensuring their safety and compliance with environmental regulations.",
    category: "USA"
  },

  {
    question: "What is US FDA",
    answer: "For packaging that comes into contact with food, the FDA enforces regulations around materials to ensure they are safe for use with consumables",
    category: "USA"
  },

  {
    question: "Who is FTC and what are their green guides ",
    answer: "The Federal Trade Commission (FTC) enforces the Green Guides, which offer guidance on environmental marketing claims such as recyclable, compostable, and biodegradable. These guidelines are designed to prevent misleading claims and greenwashing, ensuring that consumers are not misled by inaccurate or vague eco-friendly labels. For example, companies may label products as organic or eco-friendly in ways that could be confusing or misleading to consumers, but the FTC's Green Guides help clarify these terms to protect consumer understanding and promote honest marketing practices.",
    category: "USA"
  },
  {
    question: "Trade regulating bodies in USA ",
    answer: "In the United States, several key regulatory bodies oversee trade, including the U.S. Trade Representative (USTR), which leads trade negotiations and policy; U.S. Customs and Border Protection (CBP), which enforces import/export laws and collects tariffs; the Department of Commerce (DOC), through the International Trade Administration (ITA), which promotes exports and ensures fair trade; the U.S. International Trade Commission (USITC), which investigates trade issues like dumping and subsidies; the Food and Drug Administration (FDA), which regulates the import of food, drugs, and medical devices; and the Bureau of Industry and Security (BIS), which administers export controls on sensitive technologies. These agencies work together to manage and regulate U.S. trade compliance, tariffs, and safety standards.",
    category: "USA"
  },
  {
    question: "What benefits does the usa offer to Indian exporters to facilitate trade? ",
    answer: "The United States offers several benefits to Indian exporters, including preferential trade programs like the Generalized System of Preferences (GSP), which provides duty-free access to many products. Indian businesses also gain access to the large U.S. market, supported by trade agreements that reduce barriers. The U.S. offers a stable legal framework that protects intellectual property and advanced logistics infrastructure, making it easier for Indian exporters to do business and reach customers efficiently.",
    category: "USA"
  },
  {
    question: "What is the average tariff rate applied by the United States on exports from India, and how can specific duty rates be determined? ",
    answer: "The United States applies the Harmonized Tariff Schedule (HTS) to imports from all countries, including India. Tariff rates vary based on the product's classification under the HTS. For instance, in 2022, the average Most Favored Nation (MFN) applied tariff rate for U.S. imports from India was approximately 4.5%.  To determine specific duty rates for individual products, it's essential to know their Harmonized System (HS) codes. The U.S. International Trade Commission's Harmonized Tariff Schedule provides detailed information on applicable duties and regulations for each product.  ",
    category: "USA"
  },
  {
    question: "Whether realisation of foreign currency for the RoSCTL benefit is necessary?",
    answer: "The Scheme provides that the rebate under RoSCTL would not bedependent on the realization of export proceeds at the time of claim ofrebate. However, the rebate is allowed subject to receipt of sale proceedswithin the period allowed under the Foreign Exchange Management Act, 1999failing which such rebate shall never be deemed to have been allowed and theduty credit scrip issued shall be deemed to be ineligible",
    category: "Incentives"
  },

  {
    question: "How do I handle VAT when exporting to the EU?",
    answer: "When exporting to the EU, goods are generally zero-rated for VAT in the country of export. However, import VAT and possibly customs duties will be charged when the goods enter the EU. The importer is typically responsible for paying these charges. If you're selling B2C, you may need to register for VAT in the destination country under certain conditions.",
    category: "EU"
  },
  {
    question: "what are trade defence rules in EU",
    answer: "Trade defense rules in the European Union (EU) are designed to protect EU businesses from unfair trade practices such as dumping, subsidies, or surges in imports that harm local industries. The key tools include anti-dumping measures, which impose duties on goods sold at unfairly low prices; anti-subsidy measures, which counteract government subsidies that enable unfair pricing; and safeguard measures, which temporarily limit imports in cases of sudden surges that harm EU producers. Additionally, the EU investigates non-tariff barriers that may restrict fair competition. These rules ensure a level playing field for EU businesses and are enforced by the European Commission through investigations and appropriate actions.",
    category: "EU"
  },

  {
    question: "What are Import Duties and Taxes in the EU",
    answer: "The Common External Tariff (CET) determines tariff rates based on product classification (HS codes) and the country of origin, with preferential rates available for goods from countries with EU trade agreements that meet specific rules of origin. Value Added Tax (VAT) is a consumption tax applied to goods and services at each production stage, with rates varying from 17% to 27% across EU countries. VAT is calculated on the customs value, which includes the CET and any excise duties. Excise duties are levied on specific goods like alcohol, tobacco, and fuel, with rates varying by product and country. The customs value for duties includes the price paid, transport, insurance, and potentially other costs, making accurate declaration crucial to avoid penalties. To ensure compliance, it's important to correctly classify goods, verify their origin for preferential tariffs, calculate VAT and duties, and maintain accurate documentation.",
    category: "EU"
  },
  {
    question: "What are EU import regulations and documentation",
    answer: "Exporting goods from India to the EU requires a solid understanding of the Union Customs Code (UCC) and adherence to various import regulations. Key requirements include accurate customs valuation, proper classification of goods based on the Harmonized System (HS) code, and establishing the product’s origin to determine eligibility for preferential tariffs. India’s trade agreements with the EU may offer reduced or zero tariffs for qualifying products. Specific product regulations like CE marking for electronics, REACH compliance for chemicals, and food safety standards must also be met. Essential documentation includes the Single Administrative Document (SAD) for customs declarations, import licenses for restricted goods, technical documentation proving compliance with EU standards, and proof of origin to determine applicable tariff rates.",
    category: "EU"
  },
  {
    question: "What are rules and regulation to export plastic content items to EU",
    answer: "When exporting plastic products to the European Union (EU), businesses must comply with EU-wide regulations and be aware of potential country-specific rules. Key regulations include ensuring product compliance with EU standards, such as those for food contact materials under the Plastics Regulation (EU) No. 10/2011. Companies must also adhere to packaging and waste management requirements outlined in the Packaging and Packaging Waste Directive, which includes Extended Producer Responsibility (EPR) schemes for packaging waste. Additionally, the EU's Single-Use Plastics Directive restricts certain plastic products, such as single-use straws and plastic plates. It’s also important to be aware that individual EU member states may have additional regulations, such as bans on lightweight plastic bags or specific requirements for packaging. Therefore, businesses should review both EU-wide laws and the specific regulations of the country they plan to export to in order to ensure full compliance and avoid potential penalties.",
    category: "EU"
  },
  {
    question: "What are the key considerations for exporting goods to the European Union, and how do country-specific regulations affect the process?",
    answer: "When exporting goods to the European Union (EU), businesses must comply with both EU-wide regulations and country-specific requirements. While customs procedures are largely harmonized through the Union Customs Code, some differences in procedures and documentation may exist among member states. Key steps include ensuring product compliance with EU standards, such as obtaining CE marking for certain goods, and preparing necessary import documentation like commercial invoices and certificates of origin. Import duties and taxes are generally standardized across the EU but can vary depending on the product and destination country. Additionally, some member states may have specific prohibitions, restrictions, or national regulations, such as unique labeling or packaging requirements. To ensure full compliance, it is essential to consult the relevant authorities in the destination country and the European Commission's trade portal for up-to-date information on importing into the EU.",
    category: "EU"
  },
  {
    question: "What are the key tariffs and trade measures applied by the European Union on imports from India, and how can businesses determine specific duty rates for products?",
    answer: "The European Union (EU) applies the Common Customs Tariff (CCT) to imports from non-EU countries, including India, with tariffs varying based on product classification and origin. In 2021, EU-India trade in goods amounted to €88 billion, representing 10.8% of India's total trade. To determine specific tariff rates, businesses must reference the Harmonized System (HS) code, with detailed information available through the EU's Integrated Tariff (TARIC). The EU also enforces trade defense measures, such as anti-dumping duties on certain products, including steel from India. For the most current information on tariffs and regulations, the EU's Access2Markets portal is recommended.",
    category: "EU"
  },
  {
    question: "Products exported by India to Eu",
    answer: "India's top exports to the European Union (EU) include textiles and apparel, chemicals (such as pharmaceuticals and agrochemicals), engineering goods (machinery and electrical equipment), agricultural products (like spices, tea, and coffee), and gems and jewelry. The EU is India's second-largest trading partner, with significant exports coming from these diverse sectors.",
    category: "EU"
  },
  {
    question: "What benefits does the European Union offer to Indian exporters to facilitate trade?",
    answer: "The European Union (EU) offers several benefits to Indian exporters, including preferential tariffs under the Generalized System of Preferences (GSP), access to a large consumer market, and trade facilitation through agreements that reduce barriers. Indian businesses also gain from clear regulations and standards for market entry, particularly in sectors like food, pharmaceuticals, and textiles. Additionally, platforms like Access2Markets provide valuable information to help exporters navigate EU tariffs and regulations, fostering smoother trade relations.",
    category: "EU"
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
    <div className="container mx-auto px-4 pt-32 py-8 max-w-4xl h-[100%]">  {/* Increased pt-32 to avoid overlap with navbar */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-primary"
      >
        Export FAQ: USA & EU
      </motion.h1>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
        </div>
        <div className="flex gap-2">
          {["All", "USA", "EU", "Incentives"].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2 border-blue-900"
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
