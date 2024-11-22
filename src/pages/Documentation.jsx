import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Example icon from react-icons

const Documentation = () => {
  const cardData = [
    { title: "Quotation", description: "Contains the format and details required for creating quotation for the shipment." },
    { title: "Commercial Invoice cum Packing List", description: "Consists of details related to goods, pricing, and packaging of the shipment." },
    { title: "Pro Forma Invoice", description: "It is a pre-shipment invoice that is sent to the customer before the shipment is made and to confirm sales and delivery." },
    { title: "Bill of Exchange", description: "It is the document assuring payment by the buyer." }
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-5">
      <div className="flex space-x-4 overflow-x-auto gap-x-6"> {/* Increased space between cards */}
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-[#f0f4ff] border border-[#183473] rounded shadow-md w-full max-w-sm h-96 transform transition-transform duration-300 ease-in-out hover:bg-[#e0efff] hover:shadow-lg hover:scale-105 overflow-hidden"
          >
            <div className="p-6 h-full">
              <div className="mb-4">
                <FaInfoCircle className="h-6 w-6 mb-2 text-[#183473]" />
                <h2 className="text-[#183473] text-xl font-bold">{card.title}</h2>
              </div>
              <div className="flex-grow">
                <p className="text-[#183473]">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
