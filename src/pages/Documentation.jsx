import React from "react";
import { Link } from "react-router-dom";
import { MdDescription } from "react-icons/md";
import { FaFileInvoice, FaFileAlt, FaFileSignature } from "react-icons/fa";

const Documentation = () => {
  const cardData = [
    {
      title: "Quotation",
      description: "Contains the format and details required for creating a quotation for the shipment.",
      route: "/quotation",
      icon: <MdDescription size={40} className="text-[#183473]" />,
    },
    {
      title: "Commercial Invoice cum Packing List",
      description: "Consists of details related to goods, pricing, and packaging of the shipment.",
      route: "/invoice-form",
      icon: <FaFileInvoice size={40} className="text-[#183473]" />,
    },
    {
      title: "Pro Forma Invoice",
      description:
        "It is a pre-shipment invoice sent to the customer before the shipment to confirm sales and delivery.",
      route: "/pro-forma-invoice",
      icon: <FaFileAlt size={40} className="text-[#183473]" />,
    },
    {
      title: "Bill of Exchange",
      description: "It is the document assuring payment by the buyer.",
      route: "/bill-of-exchange",
      icon: <FaFileSignature size={40} className="text-[#183473]" />,
    },
  ];

  return (
    <div className="z-1 flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-[#183473] mb-8 text-black">
        Documentation Overview for Exporting to US and EU
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {cardData.map((card, index) => (
          <Link to={card.route || "#"} key={index} className="no-underline">
            <div className="bg-[#f0f4ff] border border-[#183473] rounded shadow-md w-80 h-80 flex flex-col transform transition-transform duration-300 ease-in-out hover:bg-[#e0efff] hover:shadow-lg hover:scale-105">
              <div className="p-6 flex flex-col flex-grow justify-center items-center">
                {/* Title with Icon aligned to the center */}
                <div className="mb-4 flex flex-col items-center justify-center">
                  {card.icon}
                  <h2 className="text-[#183473] text-xl font-bold text-center">{card.title}</h2>
                </div>

                {/* Description centered vertically */}
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-[#183473] text-center">{card.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Documentation;
