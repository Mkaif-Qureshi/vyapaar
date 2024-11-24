import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ProFormaInvoice() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    companyName: "",
    companySlogan: "",
    streetAddress: "",
    cityStateZip: "",
    phoneNumber: "",
    faxNumber: "",
    invoiceDate: "",
    expirationDate: "",
    invoiceNumber: "",
    customerId: "",
    customerName: "",
    customerCompanyName: "",
    customerStreetAddress: "",
    customerCityStateZip: "",
    customerPhoneNumber: "",
    shipToName: "",
    shipToCompanyName: "",
    shipToStreetAddress: "",
    shipToCityStateZip: "",
    shipToPhoneNumber: "",
    freightType: "",
    estimatedShippingDate: "",
    estimatedGrossWeight: "",
    estimatedCubicWeight: "",
    totalPackages: "",
    partNumber: "",
    unitMeasure: "",
    description: "",
    quantity: "",
    unitPrice: "",
    tax: "",
    totalAmount: "",
    termsOfSale: "",
    paymentTerms: "",
    countryOfOrigin: "",
  });

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "India",
    "Germany",
    "France",
    "China",
    "Japan",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generatePDF = async () => {
    const element = formRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("ProFormaInvoice.pdf");
  };

  // Initial state for products (empty array or with a default product)
const [products, setProducts] = useState([
  { partNumber: '', unitMeasure: '', description: '', quantity: '', unitPrice: '', tax: '', totalAmount: '' }
]);

// Handle input changes for each product row
const handleProductInputChange = (index, event) => {
  const { name, value } = event.target;
  const updatedProducts = [...products];
  updatedProducts[index][name] = value;

  // Calculate total amount based on quantity and unitPrice (for example)
  if (name === 'quantity' || name === 'unitPrice') {
    const product = updatedProducts[index];
    product.totalAmount = (product.quantity * product.unitPrice).toFixed(2);
  }

  setProducts(updatedProducts);
};

// Add a new product row
const addProductRow = () => {
  setProducts([...products, { partNumber: '', unitMeasure: '', description: '', quantity: '', unitPrice: '', tax: '', totalAmount: '' }]);
};

// Remove a product row
const removeProductRow = (index) => {
  const updatedProducts = products.filter((_, idx) => idx !== index);
  setProducts(updatedProducts);
};

  return (
    <div className="invoice-container" style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#fff", padding: "20px" }}>
      <div ref={formRef} className="invoice-form" style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
        <h1 className="invoice-title" style={{ textAlign: "center", fontWeight: "bold", fontSize: "36px", color: "#00AEE6" }}>
          PRO FORMA INVOICE
        </h1>

        {/* Company Information */}
        <section style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ width: "48%" }}>
            <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Company Information</h3>
            <div className="form-row">
              <label style={{ color: "black" }}>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Company Slogan:</label>
              <input
                type="text"
                name="companySlogan"
                value={formData.companySlogan}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Street Address:</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>City, ST ZIP:</label>
              <input
                type="text"
                name="cityStateZip"
                value={formData.cityStateZip}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Fax Number:</label>
              <input
                type="text"
                name="faxNumber"
                value={formData.faxNumber}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
          </div>

          <div style={{ width: "48%" }}>
            <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Date & Invoice Details</h3>
            <div className="form-row">
              <label style={{ color: "black" }}>Date:</label>
              <input
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Expiration Date:</label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Invoice Number:</label>
              <input
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" ,color: "black"}}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Customer ID:</label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
          </div>
        </section>

        {/* Customer Information */}
        <section style={{ marginBottom: "20px", backgroundColor: "#f1f1f1", padding: "15px", borderRadius: "5px" }}>
          <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Customer Information</h3>
          <div className="form-row">
            <label style={{ color: "black" }}>Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
            />
          </div>
          <div className="form-row">
            <label style={{ color: "black" }}>Customer Company Name:</label>
            <input
              type="text"
              name="customerCompanyName"
              value={formData.customerCompanyName}
              onChange={handleChange}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
            />
          </div>
          <div className="form-row">
            <label style={{ color: "black" }}>Customer Street Address:</label>
            <input
              type="text"
              name="customerStreetAddress"
              value={formData.customerStreetAddress}
              onChange={handleChange}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
            />
          </div>
          <div className="form-row">
            <label style={{ color: "black" }}>Customer City, ST ZIP:</label>
            <input
              type="text"
              name="customerCityStateZip"
              value={formData.customerCityStateZip}
              onChange={handleChange}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
            />
          </div>
          <div className="form-row">
            <label style={{ color: "black" }}>Customer Phone:</label>
            <input
              type="text"
              name="customerPhoneNumber"
              value={formData.customerPhoneNumber}
              onChange={handleChange}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
            />
          </div>
        </section>

        {/* Ship To Information */}
        <section style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ width: "48%" }}>
            <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Ship To Information</h3>
            <div className="form-row">
              <label style={{ color: "black" }}>Name:</label>
              <input
                type="text"
                name="shipToName"
                value={formData.shipToName}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Company Name:</label>
              <input
                type="text"
                name="shipToCompanyName"
                value={formData.shipToCompanyName}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Street Address:</label>
              <input
                type="text"
                name="shipToStreetAddress"
                value={formData.shipToStreetAddress}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>City, ST ZIP:</label>
              <input
                type="text"
                name="shipToCityStateZip"
                value={formData.shipToCityStateZip}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc" ,color: "black"}}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Phone Number:</label>
              <input
                type="text"
                name="shipToPhoneNumber"
                value={formData.shipToPhoneNumber}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
          </div>

          {/* Shipping Details */}
          <div style={{ width: "48%" }}>
            <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}> Shipping Details</h3>
            <div className="form-row">
              <label style={{ color: "black" }}>Freight Type (Air or Ocean):</label>
              <input
                type="text"
                name="freightType"
                value={formData.freightType}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Estimated Ship Date:</label>
              <input
                type="date"
                name="estimatedShippingDate"
                value={formData.estimatedShippingDate}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Estimated Gross Weight:</label>
              <input
                type="text"
                name="estimatedGrossWeight"
                value={formData.estimatedGrossWeight}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Estimated Cubic Weight:</label>
              <input
                type="text"
                name="estimatedCubicWeight"
                value={formData.estimatedCubicWeight}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
            <div className="form-row">
              <label style={{ color: "black" }}>Total Packages (Qty):</label>
              <input
                type="number"
                name="totalPackages"
                value={formData.totalPackages}
                onChange={handleChange}
                style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc",color: "black" }}
              />
            </div>
          </div>
        </section>

        {/* Product Table */}
        <section style={{ marginBottom: "20px" }}>
  <h3 style={{ color: "white", backgroundColor: "#183473", padding: "3px" }}>
    Product Details
  </h3>
  <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
    <thead style={{ backgroundColor: "#f1f1f1" }}>
      <tr>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Part Number
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Unit of Measure
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Description
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Qty
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Unit Price
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Tax
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Total Amount
        </th>
        <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "#183473" }}>
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {products.map((product, index) => (
        <tr key={index}>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center", color: "black" }}>
            <input
              type="text"
              name="partNumber"
              value={product.partNumber}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="text"
              name="unitMeasure"
              value={product.unitMeasure}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="text"
              name="unitPrice"
              value={product.unitPrice}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="text"
              name="tax"
              value={product.tax}
              onChange={(event) => handleProductInputChange(index, event)}
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <input
              type="text"
              name="totalAmount"
              value={product.totalAmount}
              disabled
              style={{ width: "100%", padding: "5px", fontSize: "14px", borderRadius: "4px", border: "1px solid #ccc", color: "black" }}
            />
          </td>
          <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "center" }}>
            <button
              onClick={() => removeProductRow(index)}
              style={{ backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button
    onClick={addProductRow}
    style={{ backgroundColor: "#5cb85c", color: "white", border: "none", borderRadius: "4px", padding: "10px 15px", cursor: "pointer" }}
  >
    Add Product
  </button>
</section>


        {/* Terms of Sale & Comments */}
        <section style={{ marginBottom: "20px", backgroundColor: "#f9f9f9", padding: "15px", borderRadius: "5px" }}>
          <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Terms of Sale & Comments</h3>
          <textarea
            name="termsOfSale"
            value={formData.termsOfSale}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              height: "100px",
            }}
            placeholder="Include terms of sale or other information needed"
          />
         <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-green-200 dark:focus:ring-green-400 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center me-2 mb-2 ml-auto">Generate ✨ </button>

        </section>

        {/* Additional Details */}
        <section style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "white", backgroundColor: "#183473",padding:"3px" }}>Additional Details</h3>
          <div className="form-row">
            <label style={{ color: "black" }}>Country of Origin:</label>
            <select
              name="countryOfOrigin"
              value={formData.countryOfOrigin}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "5px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                color: "black"
              }}
            >
              {countries.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Print Button */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={generatePDF}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProFormaInvoice;
