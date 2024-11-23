import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";


const Quotation = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        companyAddress: "",
        phoneNo: "",
        email: "",
        gstin: "",
        state: "",
        quotationFor: "",
        quotationNo: "",
        customerName: "",
        vendorCode: "",
        date: "",
        customerAddress: "",
        customerId: "",
        methodOfDispatch: "",
        typeOfShipment: "",
        pointOfLoading: "",
        pointOfDischarge: "",
        items: [
            { description: "", productCode: "", quantity: 0, unit: "", pricePerUnit: 0, gst: 0 }
        ],
        subTotal: 0,
        cgst: 0,
        sgst: 0,
        discount: 0,
        totalAmount: 0,
        advanceAmount: 0,
        balanceAmount: 0,
        termsandConditions: "",
     
    });
    
    const [logo, setLogo] = useState(null); // State to store the uploaded logo as Base64

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                return;
            }
    
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result); // Save Base64 string to state
            };
            reader.onerror = () => {
                alert("Failed to load the image. Please try again.");
            };
            reader.readAsDataURL(file);
        }
    };
    


    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (index !== null) {
            const updatedItems = [...formData.items];
            updatedItems[index][name] = value;
            setFormData({ ...formData, items: updatedItems });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const calculateTotals = () => {
        const subTotal = formData.items.reduce(
            (acc, item) => acc + item.quantity * item.pricePerUnit,
            0
        );
        const gstAmount = subTotal * 0.18; // Example: 18% GST
        const totalAmount = subTotal + gstAmount - formData.discount;
        const balanceAmount = totalAmount - formData.advanceAmount;

        setFormData({
            ...formData,
            subTotal,
            cgst: gstAmount / 2,
            sgst: gstAmount / 2,
            totalAmount,
            balanceAmount
        });
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [
                ...formData.items,
                { description: "", productCode: "", quantity: 0, unit: "", pricePerUnit: 0, gst: 0 }
            ]
        });
    };

    const handleSubmit = () => {
        calculateTotals();
        const doc = new jsPDF();
    
        // Add Logo
        const imgData = 'data:image/png;base64,INSERT_BASE64_ENCODED_IMAGE_HERE'; // Replace with your logo's base64 string or use URL
        doc.addImage(logo, 'JPEG', 160, 10, 40, 20);
    
        // Header
        doc.setFontSize(18);
        doc.text("Quotation", 105, 10, { align: "center" });
    
        // Company Details
        doc.setFontSize(12);
        doc.text("Company Name:", 10, 40);
        doc.text(formData.companyName || "N/A", 50, 40);
        doc.text("Address:", 10, 50);
        doc.text(formData.companyAddress || "N/A", 50, 50);
        doc.text("Phone No.:", 10, 60);
        doc.text(formData.phoneNo || "N/A", 50, 60);
        doc.text("Email ID:", 10, 70);
        doc.text(formData.email || "N/A", 50, 70);
        doc.text("GSTIN:", 10, 80);
        doc.text(formData.gstin || "N/A", 50, 80);
        doc.text("State:", 10, 90);
        doc.text(formData.state || "N/A", 50, 90);
    
        if (logo) {
            try {
                doc.addImage(logo, 'PNG', 160, 10, 40, 20); // Adjust type if JPEG is uploaded
            } catch (error) {
                console.error("Failed to add image:", error);
                alert("Failed to add the uploaded logo to the PDF.");
            }
        }
    
        // Quotation Details
        doc.text("Quotation No.:", 130, 40);
        doc.text(formData.quotationNo || "N/A", 180, 40);
        doc.text("Date:", 130, 50);
        doc.text(formData.date || "N/A", 180, 50);
        doc.text("Customer Name:", 130, 60);
        doc.text(formData.customerName || "N/A", 180, 60);
        doc.text("Customer Address:", 130, 70);
        doc.text(formData.customerAddress || "N/A", 180, 70);
    
        // Shipment Details
        let yPosition = 100;
        doc.text("Vendor Code/ID :", 10, yPosition);
        doc.text(formData.vendorCode || "N/A", 60, yPosition);
        yPosition += 10;
        doc.text("Method of Dispatch:", 10, yPosition);
        doc.text(formData.methodofdispatch || "N/A", 60, yPosition);
        yPosition += 10;
        doc.text("Type of Shipment:", 10, yPosition);
        doc.text(formData.Typeofshipment || "N/A", 60, yPosition);
        yPosition += 10;
        doc.text("Point of Loading:", 10, yPosition);
        doc.text(formData.pointofloading || "N/A", 60, yPosition);
        yPosition += 10;
        doc.text("Point of Discharge:", 10, yPosition);
        doc.text(formData.pointOfDischarge || "N/A", 60, yPosition);
    
        // Items Table
        const itemsTable = formData.items.map((item, index) => [
            index + 1,
            item.description,
            item.productCode,
            item.quantity,
            item.unit,
            item.pricePerUnit.toFixed(2),
            `${item.gst}%`,
        ]);
        doc.autoTable({
            head: [["SL. No.", "Description", "Product Code", "Quantity", "Unit", "Price/Unit (without tax)", "GST"]],
            body: itemsTable,
            startY: yPosition + 20,
        });
    
        // Totals and Terms Alignment
        const totalsY = doc.lastAutoTable.finalY + 10;
    
        // Totals (Aligned to Right)
        const totalsX = 140; // Align totals to the right
        doc.text(`Sub Total (With Tax): ${formData.subTotal.toFixed(2)}`, totalsX, totalsY);
        doc.text(`CGST: ${formData.cgst.toFixed(2)}`, totalsX, totalsY + 10);
        doc.text(`SGST: ${formData.sgst.toFixed(2)}`, totalsX, totalsY + 20);
        doc.text(`Discount Amount: ${formData.discount.toFixed(2)}`, totalsX, totalsY + 30);
        doc.text(`Total Amount: ${formData.totalAmount.toFixed(2)}`, totalsX, totalsY + 40);
        doc.text(`Advance Amount: ${formData.advanceAmount.toFixed(2)}`, totalsX, totalsY + 50);
        doc.text(`Balance Amount: ${formData.balanceAmount.toFixed(2)}`, totalsX, totalsY + 60);
    
        // Terms and Conditions (Aligned to Left)
        const termsStartY = totalsY;
        doc.text("Terms and Conditions:", 10, termsStartY);
        const termsLineHeight = 10;
        const termsText = formData.termsandConditions || "No terms provided.";
        const termsSplitText = doc.splitTextToSize(termsText, 120);
        termsSplitText.forEach((line, index) => {
            doc.text(line, 10, termsStartY + (index + 1) * termsLineHeight);
        });
    
        // Footer with Seal & Signature (Aligned to Left)
        const footerY = doc.internal.pageSize.height - 30;
        doc.text("Seal & Signature", 10, footerY);
    
        // Save PDF
        doc.save("quotation.pdf");
        alert("Quotation generated!");
    };

    return (
        <div className="min-h-screen bg-white text-black p-6">
            <h1 className="text-2xl font-bold mb-6">Quotation Form</h1>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                {/* Company Details */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Company Details</h2>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />

                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="companyAddress"
                        placeholder="Company Address"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="phoneNo"
                        placeholder="Phone Number"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="gstin"
                        placeholder="GSTIN"
                        value={formData.gstin}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Shipment Details */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold"> Shipment Details</h2>
                    <input
                        type="text"
                        name="quotationNo"
                        placeholder="Quotation No"
                        value={formData.quotationNo}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                    type="text"
                    name="vendorCode"  // Use vendorCode here
                    placeholder="Vendor code"
                    value={formData.vendorCode}  // Ensure this matches the state
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                    type="date"
                    name="date"  // Correctly reference 'date'
                    placeholder="Date"
                    value={formData.date}  // Ensure this matches the state
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                    />


                       <input
                        type="text"
                        name="methodofdispatch"
                        placeholder="method of dispatch"
                        value={formData.methodofdispatch}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="Typeofshipment"
                        placeholder="Type of shipment"
                        value={formData.Typeofshipment}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="pointofloading"
                        placeholder="Point of loading"
                        value={formData.pointofloading}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="pointOfDischarge"
                        placeholder="Point of discharge"
                        value={formData.pointOfDischarge}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                

                {/* Items Table */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Items</h2>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-6 gap-2">
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={item.description}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="productCode"
                                placeholder="Product Code"
                                value={item.productCode}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded"
                            />
                                                    <select
                                name="unit"
                                value={item.unit}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded bg-white"
                            >
                                <option value="" disabled>
                                    Select Unit
                                </option>
                                <option value="day">Day</option>
                                <option value="hour">Hour</option>
                            </select>

                            <input
                                type="number"
                                name="pricePerUnit"
                                placeholder="Price Per Unit"
                                value={item.pricePerUnit}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                name="gst"
                                placeholder="GST"
                                value={item.gst}
                                onChange={(e) => handleChange(e, index)}
                                className="p-2 border border-gray-300 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Add Item
                    </button>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Totals</h2>
                    <input
                        type="number"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        name="advanceAmount"
                        placeholder="Advance Amount"
                        value={formData.advanceAmount}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="button"
                        onClick={calculateTotals}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Calculate
                    </button>
                </div>

                {/* Final Details */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Final Amounts</h2>
                    <p>Sub Total: {formData.subTotal}</p>
                    <p>CGST: {formData.cgst}</p>
                    <p>SGST: {formData.sgst}</p>
                    <p>Total Amount: {formData.totalAmount}</p>
                    <p>Balance Amount: {formData.balanceAmount}</p>

                   
                </div>
                <div className="space-y-2">
                <h2 className="text-xl font-semibold">Terms and Conditions</h2>
                <textarea
                 type="text"
                name="termsandConditions"  
                placeholder="Terms and Conditions"
                value={formData.termsandConditions}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded"
                />


                </div>
                 <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Generate Quotation
                    </button>
            </form>
        </div>
    );
};

export default Quotation;
