import React, { useState } from 'react';
import { ChevronDown } from 'react-feather'; // Icons

const ExportProcess = () => {
    const [openIndex, setOpenIndex] = useState(null); // State to track which dropdown is open
    const steps = [
        {
            title: "Register Your Company",
            description: "Establish your business entity with the necessary registrations.",
            icon: <img src='src/assets/icons/office-building.png' alt='import-export' style={{height:'32px'}} />,
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
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 48 48"
                    height="32"
                    width="32"
                    id="Bank--Streamline-Kameleon"
                >
                    <desc>Bank Streamline Icon: https://streamlinehq.com</desc>
                    <path
                        fill="#deeeff"
                        d="M23.9979 47.9997c13.2548 0 23.9999 -10.745 23.9999 -23.9998C47.9978 10.7451 37.2527 0 23.9979 0S-0.00195312 10.7451 -0.00195312 23.9999 10.7431 47.9997 23.9979 47.9997Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#2e3ecd"
                        d="M37.9613 20.5087v1.7455H10.0342v-1.7455l13.9635 -8.7272 13.9636 8.7272Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#2e3ecd"
                        d="M11.7803 36.2179v-1.7455h24.4362v1.7455H11.7803Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#6bafff"
                        d="M18.3255 22.2544h-4.3636v12.2181h4.3636V22.2544Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#6bafff"
                        d="M26.18 22.2544h-4.3636v12.2181H26.18V22.2544Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#6bafff"
                        d="M34.0345 22.2544h-4.3636v12.2181h4.3636V22.2544Z"
                        stroke-width="1"
                    ></path>
                    <path
                        fill="#2e3ecd"
                        d="M37.9613 36.2178H10.0342v1.7454h27.9271v-1.7454Z"
                        stroke-width="1"
                    ></path>
                </svg>
            ),
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
            icon: <img src='src/assets/icons/import.png' alt='import-export' style={{height:'32px'}} />,
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
            icon: <img src='src/assets/icons/verified.png' alt='verify' style={{height:'32px'}} />,
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
            icon: <img src='src/assets/icons/registered.png' alt='document' style={{height:'32px'}} />,
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
            icon: <img src='src/assets/icons/document.png' alt='document' style={{height:'32px'}} />,
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
            icon: <img src='src/assets/icons/delivery-truck.png' alt='document' style={{height:'32px'}} />,
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

    // Function to handle dropdown toggle
    const toggleDropdown = (index) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index); // Toggle the selected dropdown
    };

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 bg-[#f8f9fa]">
            <div className="container px-4 md:px-6 mx-auto text-gray-800">
                <h2 className="text-center text-2xl font-bold md:text-4xl text-[#0f2557]">
                    Export Process Simplified
                </h2>
                <p className="text-center text-gray-600 max-w-[800px] mx-auto my-4">
                    Navigate through the key steps to export your products seamlessly.
                </p>
                <div className="flex overflow-x-auto space-x-4 py-1 px-4 scrollbar-hide">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[350px] bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center flex flex-col"
                        >
                            <div className="flex flex-col h-full">
                                {/* Icon */}
                                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#F0F4FF] text-[#0f2557] rounded-full">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>

                                {/* Description */}
                                <div
                                    className="text-gray-600 mt-2 overflow-hidden"
                                    style={{
                                        height: "75px", // Adjustable height for the description
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {step.description}
                                </div>
                            </div>

                            {/* More Info */}
                            <div className="flex flex-wrap justify-center mt-auto">
                                <div
                                    className="cursor-pointer text-sm text-gray-600 mr-4"
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <div className="flex justify-center items-center space-x-1">
                                        <span className="inline-block">More Info</span>
                                        <ChevronDown
                                            size={16}
                                            className={`transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                    {openIndex === index && (
                                        <div className="text-sm text-gray-500 mt-2 text-left">
                                            {step.details}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExportProcess;
