import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Icon from react-icons
import { Link } from 'react-router-dom'; // Import Link for navigation

const Documentation = () => {
  const cardData = [
    {
      title: "Quotation",
      description: "Contains the format and details required for creating a quotation for the shipment.",
      route: "/quotation" // Example route for Quotation
    },
    {
      title: "Commercial Invoice cum Packing List",
      description: "Consists of details related to goods, pricing, and packaging of the shipment.",
      route: "/invoice-form" // Navigation route for Commercial Invoice
    },
    {
      title: "Pro Forma Invoice",
      description: "It is a pre-shipment invoice sent to the customer before the shipment to confirm sales and delivery.",
      route: "/pro-forma-invoice" // Navigation route for Pro Forma Invoice
    },
    {
      title: "Bill of Exchange",
      description: "It is the document assuring payment by the buyer.",
      route: "/bill-of-exchange" // Navigation route for Bill of Exchange
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-[#183473] mb-8 text-black">
        Documentation Overview for Exporting to US and EU
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <Link
            to={card.route || "#"}
            key={index}
            className="no-underline"
          >
            <div
              className="bg-[#f0f4ff] border border-[#183473] rounded shadow-md w-full max-w-sm transform transition-transform duration-300 ease-in-out hover:bg-[#e0efff] hover:shadow-lg hover:scale-105"
            >
              <div className="p-6 h-full">
                <div className="mb-4 flex items-center">
                  <FaInfoCircle className="h-6 w-6 text-[#183473] mr-2" />
                  <h2 className="text-[#183473] text-xl font-bold">{card.title}</h2>
                </div>
                <p className="text-[#183473]">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
