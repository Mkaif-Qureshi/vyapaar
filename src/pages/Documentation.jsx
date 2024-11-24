import React from "react";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-5">
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-8 text-[#183473] mb-2">
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                  </svg>
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
