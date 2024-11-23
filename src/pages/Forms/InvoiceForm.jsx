import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";

const InvoiceForm = () => {
  const formRef = useRef();

  // State for form data
  const [formData, setFormData] = useState({
    exporter: "",
    invoiceNumber: "",
    date: "",
    exporterRef: "",
    buyersOrderNumber: "",
    buyersOrderDate: "",
    consignee: "",
    termsOfDelivery: "",
    billNo: "",
    awbNo: "",
    pieces: "",
    weight: "",
    marks: "",
    description: "",
    quantity: "",
    rate: "",
    amount: "",
  });

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to print the content
  const handlePrint = useReactToPrint({
    content: () => formRef.current,
  });

  // Function to export the content to PDF
  const handleDownloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const {
      exporter, invoiceNumber, date, exporterRef, buyersOrderNumber, buyersOrderDate,
      consignee, termsOfDelivery, billNo, awbNo, pieces, weight, marks, description,
      quantity, rate, amount
    } = formData;
  
    // Global styles
    pdf.setFont("Arial", "normal");
    pdf.setFontSize(12);
  
    // Add a border around the entire document
    pdf.rect(5, 5, 200, 287); // Page border
  
    // Header Section with a bottom border
    pdf.setFontSize(14);
    pdf.text("Pro Forma Invoice Cum Packing List", 105, 15, { align: "center" });
    pdf.line(5, 20, 205, 20); // Header bottom border
  
    // Exporter and Invoice Details Section
    pdf.setFontSize(12);
    pdf.text("Exporter:", 10, 30);
    pdf.text(exporter || "N/A", 50, 30, { maxWidth: 140 });
  
    pdf.text("Invoice Number:", 10, 40);
    pdf.text(invoiceNumber || "N/A", 50, 40);
    pdf.text("Date:", 120, 40);
    pdf.text(date || "N/A", 140, 40);
  
    // Exporter's Ref & Buyer's Order Details
    pdf.line(5, 50, 205, 50); // Section separator
    pdf.text("Exporter's Ref:", 10, 55);
    pdf.text(exporterRef || "N/A", 50, 55);
  
    pdf.text("Buyer's Order Number:", 10, 65);
    pdf.text(buyersOrderNumber || "N/A", 50, 65);
    pdf.text("Buyer's Order Date:", 120, 65);
    pdf.text(buyersOrderDate || "N/A", 150, 65);
  
    // Consignee Details and Terms of Delivery Section
    pdf.line(5, 75, 205, 75); // Section separator
    pdf.text("Consignee:", 10, 80);
    pdf.text(consignee || "N/A", 50, 80, { maxWidth: 140 });
  
    pdf.text("Terms of Delivery and Payment:", 10, 90);
    pdf.text(termsOfDelivery || "N/A", 80, 90, { maxWidth: 100 });
  
    // Shipment Details Section
    pdf.line(5, 100, 205, 100); // Section separator
    pdf.text("Bill No:", 10, 105);
    pdf.text(billNo || "N/A", 40, 105);
  
    pdf.text("AWB No:", 80, 105);
    pdf.text(awbNo || "N/A", 110, 105);
  
    pdf.text("Pieces:", 10, 115);
    pdf.text(pieces || "N/A", 40, 115);
  
    pdf.text("Weight (KG):", 80, 115);
    pdf.text(weight || "N/A", 120, 115);
  
    // Table Section
    pdf.line(5, 125, 205, 125); // Table header separator
    pdf.setFontSize(12);
    pdf.text("Marks & No's", 10, 130);
    pdf.text("Description of Goods", 60, 130);
    pdf.text("Quantity", 110, 130);
    pdf.text("Rate (INR)", 140, 130);
    pdf.text("Amount (INR)", 170, 130);
  
    pdf.line(5, 132, 205, 132); // Table header bottom border
    pdf.text(marks || "N/A", 10, 140);
    pdf.text(description || "N/A", 60, 140, { maxWidth: 40 });
    pdf.text(quantity || "N/A", 110, 140);
    pdf.text(rate || "N/A", 140, 140);
    pdf.text(amount || "N/A", 170, 140);
  
    // Footer Section
    pdf.line(5, 275, 205, 275); // Footer separator
    pdf.text("Thank you for your business!", 105, 285, { align: "center" });
  
    // Save PDF
    pdf.save("Invoice.pdf");
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded p-6 max-w-5xl mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center text-black">
          Invoice Cum Packing List
        </h1>

        {/* Form Content */}
        <div
          ref={formRef}
          className="border p-4 text-black"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
            lineHeight: "1.6",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div className="grid grid-cols-2 mb-2">
            <div>
              <p><strong>Exporter:</strong></p>
              <textarea
                name="exporter"
                value={formData.exporter}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                rows="3"
                placeholder="Enter Exporter Details"
              />
            </div>
            <div>
              <p><strong>Invoice Number:</strong></p>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="Invoice Number"
              />
              <p className="mt-2"><strong>Date:</strong></p>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border p-1 text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2">
            <div>
              <p><strong>Exporter's Ref:</strong></p>
              <input
                type="text"
                name="exporterRef"
                value={formData.exporterRef}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="Exporter Ref"
              />
            </div>
            <div>
              <p><strong>Buyer's Order Number:</strong></p>
              <input
                type="text"
                name="buyersOrderNumber"
                value={formData.buyersOrderNumber}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="Buyer's Order Number"
              />
              <p className="mt-2"><strong>Buyer's Order Date:</strong></p>
              <input
                type="date"
                name="buyersOrderDate"
                value={formData.buyersOrderDate}
                onChange={handleChange}
                className="w-full border p-1 text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 mb-2">
            <div>
              <p><strong>Consignee:</strong></p>
              <textarea
                name="consignee"
                value={formData.consignee}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                rows="3"
                placeholder="Consignee Details"
              />
            </div>
            <div>
              <p><strong>Terms of Delivery and Payment:</strong></p>
              <textarea
                name="termsOfDelivery"
                value={formData.termsOfDelivery}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                rows="3"
                placeholder="Terms of Delivery"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-2">
            <div>
              <p><strong>Bill No:</strong></p>
              <input
                type="text"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="Bill No"
              />
            </div>
            <div>
              <p><strong>AWB No:</strong></p>
              <input
                type="text"
                name="awbNo"
                value={formData.awbNo}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="AWB No"
              />
            </div>
            <div>
              <p><strong>Pieces:</strong></p>
              <input
                type="number"
                name="pieces"
                value={formData.pieces}
                onChange={handleChange}
                className="w-full border p-1 text-black"
                placeholder="Pieces"
              />
            </div>
            <div>
              <p><strong>Weight (KG):</strong></p>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                step="0.01"
                className="w-full border p-1 text-black"
                placeholder="Weight"
              />
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Marks & No's</th>
                  <th className="border px-2 py-1">Description of Goods</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Rate (INR)</th>
                  <th className="border px-2 py-1">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      name="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      className="w-full border p-1 text-black"
                      placeholder="Marks"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border p-1 text-black"
                      placeholder="Description"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full border p-1 text-black"
                      placeholder="Quantity"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      name="rate"
                      value={formData.rate}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full border p-1 text-black"
                      placeholder="Rate"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full border p-1 text-black"
                      placeholder="Amount"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-6">
         
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
