import React from 'react';
import { ChevronDown, Truck, Briefcase } from 'react-feather'; // Icons

const ExportProcess = () => {
    const steps = [
        {
            title: "Register Your Company",
            description: "Establish your business entity with the necessary registrations.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    Choose an appropriate business structure like Sole Proprietorship, LLP, or Private Limited, and register with the MCA.
                    Visit the
                    <a
                        href="https://www.mca.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Ministry of Corporate Affairs (MCA)
                    </a>{" "}
                    for more details.
                </>
            ),
        },
        {
            title: "Open a Current Bank Account",
            description: "Open an authorized dealer bank account for foreign transactions.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    Open an account with a bank that handles foreign exchange and provides export services.
                    You can explore options at
                    <a
                        href="https://www.rbi.org.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Reserve Bank of India (RBI)
                    </a>.
                </>
            ),
        },
        {
            title: "Obtain Importer-Exporter Code (IEC)",
            description: "Apply for IEC to start exporting legally.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    IEC is mandatory for exporting goods and is issued by the Directorate General of Foreign Trade (DGFT).
                    Apply online at the
                    <a
                        href="https://dgft.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        DGFT website
                    </a>.
                </>
            ),
        },
        {
            title: "Verify Buyers & Secure Credit Insurance",
            description: "Conduct due diligence on buyers and secure insurance to mitigate risks.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    Use ECGC or private insurance providers to safeguard against buyer defaults. Learn more at
                    <a
                        href="https://www.ecgc.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        ECGC's official site
                    </a>.
                </>
            ),
        },
        {
            title: "Register with Export Promotion Council",
            description: "Gain benefits and support by registering under the relevant EPC.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    Identify the EPC for your product category to access financial incentives and networking opportunities.
                    Visit
                    <a
                        href="https://commerce.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Department of Commerce
                    </a>{" "}
                    for a list of councils.
                </>
            ),
        },
        {
            title: "Comply with GST & Other Taxes",
            description: "Ensure GST registration and proper tax compliance.",
            icon: <Briefcase size={32} />,
            details: (
                <>
                    GST compliance is essential for claiming input tax credits and smooth transactions. Refer to
                    <a
                        href="https://www.gst.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        GST Portal
                    </a>.
                </>
            ),
        },
        {
            title: "Plan Logistics & Documentation",
            description: "Choose the best shipping mode and prepare export documents.",
            icon: <Truck size={32} />,
            details: (
                <>
                    Work with reliable freight forwarders and prepare accurate shipping and customs documents. Check out
                    <a
                        href="https://www.cbic.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline ml-1"
                    >
                        CBIC
                    </a>{" "}
                    for customs guidelines.
                </>
            ),
        },
    ];

    return (
        <section className="w-full md:py-12 lg:py-16 bg-[#f8f9fa]">
            <div className="container px-4 md:px-6 text-gray-800">
                <h2 className="text-center text-2xl font-bold md:text-4xl">Export Process Simplified</h2>
                <p className="text-center text-gray-600 max-w-[800px] mx-auto my-4">
                    Navigate through the key steps to export your products seamlessly.
                </p>
                <div className="flex overflow-x-auto space-x-4 py-1 px-4 scrollbar-hide">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[350px] bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#F0F4FF] text-[#0f2557] rounded-full">
                                {step.icon}
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                            <details className="mt-4 group">
                                <summary className="cursor-pointer text-sm text-gray-600 flex items-center justify-center space-x-1">
                                    <span>More Info</span>
                                    <ChevronDown size={16} />
                                </summary>
                                <p className="text-sm text-gray-500 mt-2 group-open:mt-4">{step.details}</p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExportProcess;