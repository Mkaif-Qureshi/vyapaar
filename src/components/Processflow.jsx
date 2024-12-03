import React from "react";

const styles = `
  .process-flow::-webkit-scrollbar {
    height: 8px;
  }
  .process-flow::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .process-flow::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  .process-flow::-webkit-scrollbar-thumb:hover {
    background: #2a4a8f;
  }
`;

const ProcessStep = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center mx-4 lg:mx-6">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black flex items-center justify-center text-white text-lg md:text-xl font-bold mb-2">
        {title.charAt(0)}
      </div>
      <h3 className="text-sm md:text-lg font-semibold text-center">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground text-center mt-1">
        {description}
      </p>
    </div>
  );
};

const ProcessFlow = ({ steps }) => {
  return (
    <div className="w-full overflow-x-auto process-flow">
      <style>{styles}</style>
      <div className="flex justify-start items-center p-4 min-w-max">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <ProcessStep {...step} />
            {index < steps.length - 1 && (
              <div className="flex-shrink-0 w-8 h-0.5 md:w-12 bg-gray-300 self-center mx-2 lg:mx-4" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const Processflow = () => {
  const processSteps = [
    { title: "Company Registration Certificate", description: " To officially register and operate the business as a legal entity." },
    { title: "Bank Account for Business", description: " To ensure clear financial records and facilitate international trade transactions." },
    { title: "Import Export Code (IEC)", description: "To track and manage the international trade transactions of the business." },
    { title: "Goods and Services Tax (GST) Registration", description: "To ensure tax compliance on domestic and international trade transactions." },
    { title: "RCMC (Registration Cum Membership Certificate)", description: "To promote and facilitate exports in specific sectors." },
    { title: "Product-Specific Registrations and Certifications", description: "To ensure compliance with international quality standards and regulations." },
    { title: "Quality Certifications", description: "To meet the standards of buyers in different countries." },
    { title: "Export/Import Permits ", description: "To comply with regulations on restricted goods." },
  ];

  return (
    <section className="w-full py-6 md:py-16 lg:py-24 bg-white">
      <div className="container px-4 md:px-6 lg:px-12 mx-auto text-gray-800">
        <h1 className="text-center text-xl md:text-3xl lg:text-4xl font-bold text-[#183473]">
          Process Flow of Documents for Export
        </h1>
        <h3 className="text-center text-gray-600 max-w-[800px] mx-auto my-4 md:my-6 text-sm md:text-base">
          Step-by-step process that simplifies one of the most complex aspects of exporting - documentation gathering and compliance.
        </h3>
        {/* Process Flow Component */}
        <ProcessFlow steps={processSteps} />
      </div>
    </section>
  );
};

export default Processflow;
