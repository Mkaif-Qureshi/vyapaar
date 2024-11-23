import React from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const Documentation = () => {
  const cardData = [
    {
      title: "Quotation",
      description: "Contains the format and details required for creating a quotation for the shipment.",
      route: "/quotation",
    },
    {
      title: "Commercial Invoice cum Packing List",
      description: "Consists of details related to goods, pricing, and packaging of the shipment.",
      route: "/invoice-form",
    },
    {
      title: "Pro Forma Invoice",
      description:
        "It is a pre-shipment invoice sent to the customer before the shipment to confirm sales and delivery.",
      route: "/pro-forma-invoice",
    },
    {
      title: "Bill of Exchange",
      description: "It is the document assuring payment by the buyer.",
      route: "/bill-of-exchange",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-[#183473] mb-8 text-black">
        Documentation Overview for Exporting to US and EU
      </h1>
      <div className="flex gap-6 flex-wrap justify-center items-stretch">
        {cardData.map((card, index) => (
          <Link to={card.route || "#"} key={index} className="no-underline">
            <div className="bg-[#f0f4ff] border border-[#183473] rounded shadow-md w-80 h-80 flex flex-col transform transition-transform duration-300 ease-in-out hover:bg-[#e0efff] hover:shadow-lg hover:scale-105">
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4 flex items-center">
                  <FaInfoCircle className="h-6 w-6 text-[#183473] mr-2" />
                  <h2 className="text-[#183473] text-xl font-bold">{card.title}</h2>
                </div>
                <p className="text-[#183473] flex-grow">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
