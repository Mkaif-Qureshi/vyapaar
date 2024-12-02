import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillOfExchangeForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    place: "",
    drawerName: "",
    drawerAddress: "",
    drawerPhone: "",
    drawerEmail: "",
    amount: "",
    description: "",
    draweeName: "",
    draweeAddress: "",
    draweePhone: "",
    draweeEmail: "",
    issueDetails: "",
  });

  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = async () => {
    const element = formRef.current;
  
    // Use html2canvas to capture the form as an image
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
  
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    // Add a formal header to the PDF
    pdf.setFont("times", "bold");
    pdf.setFontSize(16);
    pdf.text("Bill of Exchange", 105, 15, { align: "center" });
    pdf.setFontSize(14);
    pdf.text("", 105, 25, { align: "center" });
  
    // Add a border around the document
    pdf.setDrawColor(0);
    pdf.setLineWidth(0.5);
    pdf.rect(10, 30, 190, 257); // A4 page border
  
    // Add additional formalities (e.g., reference number, date)
    pdf.setFont("times", "normal");
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 12, 40);
    pdf.text("Reference No: ________", 150, 40);
  
    // Add the captured form content
    const pageWidth = pdf.internal.pageSize.width - 20; // Account for margins
    const aspectRatio = canvas.width / canvas.height;
    const imgHeight = pageWidth / aspectRatio;
    pdf.addImage(imgData, "PNG", 10, 50, pageWidth, imgHeight);
  
    // Add a formal footer
    pdf.setFont("times", "italic");
    pdf.setFontSize(10);
    pdf.text("This document is generated as per the governing standards.", 105, 285, { align: "center" });
  
    // Save the PDF
    pdf.save("BillOfExchange.pdf");
  };
  

  return (
    <div className="p-6 pt-20 bg-[#e0e2e6] min-h-screen z-10">
      <div
        className="max-w-2xl mx-auto bg-white border border-[#183473] relative"
        style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}
        ref={formRef} // Attach the form to the ref
      >
        {/* Header */}
        <div className="text-center bg-[#183473] text-white py-2">
          <h1 className="text-xl font-bold">Bill Of Exchange</h1>
        </div>

        {/* Date and Place */}
        <div className="p-4">
          <div className="flex justify-between">
            <div>
              <label className="font-bold text-black">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="ml-2 border text-black w-48 px-2 py-1"
              />
            </div>
            <div>
              <label className="font-bold text-black">Place:</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="ml-2 border text-black w-48 px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* Drawer Details */}
        <div className="p-4 border-t-2 border-[#183473]">
          <h2 className="bg-[#183473] text-white py-1 px-2">Drawer Details:</h2>
          <div className="mt-2">
            <label className="text-black">Name:</label>
            <input
              type="text"
              name="drawerName"
              value={formData.drawerName}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1 mt-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-black">Address:</label>
            <textarea
              name="drawerAddress"
              value={formData.drawerAddress}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1 mt-1"
            ></textarea>
          </div>
          <div className="mt-2">
            <label className="text-black">Phone No.:</label>
            <input
              type="text"
              name="drawerPhone"
              value={formData.drawerPhone}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1 mt-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-black">Email ID:</label>
            <input
              type="email"
              name="drawerEmail"
              value={formData.drawerEmail}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1 mt-1"
            />
          </div>
        </div>

        {/* Amount */}
        <div className="p-4 border-t-2 border-[#183473]">
          <h2 className="bg-[#183473] text-white py-1 px-2">Amount:</h2>
          <div className="mt-2">
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-black">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            ></textarea>
          </div>
        </div>

        {/* Drawee Details */}
        <div className="p-4 border-t-2 border-[#183473]">
          <h2 className="bg-[#183473] text-white py-1 px-2">Drawee Details:</h2>
          <div className="mt-2">
            <label className="text-black">Name:</label>
            <input
              type="text"
              name="draweeName"
              value={formData.draweeName}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-black">Address:</label>
            <textarea
              name="draweeAddress"
              value={formData.draweeAddress}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            ></textarea>
          </div>
          <div className="mt-2">
            <label className="text-black">Phone No.:</label>
            <input
              type="text"
              name="draweePhone"
              value={formData.draweePhone}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            />
          </div>
          <div className="mt-2">
            <label className="text-black">Email ID:</label>
            <input
              type="email"
              name="draweeEmail"
              value={formData.draweeEmail}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            />
          </div>
        </div>

        {/* Issue Details */}
        <div className="p-4 border-t-2 border-[#183473]">
          <h2 className="bg-[#183473] text-white py-1 px-2">Issue Details:</h2>
          <div className="mt-2">
            <textarea
              name="issueDetails"
              value={formData.issueDetails}
              onChange={handleChange}
              className="w-full border text-black px-2 py-1"
            ></textarea>
          </div>
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="text-center mt-4">
        <button
          onClick={generatePDF}
          className="bg-[#183473] text-white px-4 py-2 rounded"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default BillOfExchangeForm;
