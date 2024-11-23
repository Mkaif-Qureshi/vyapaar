import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection ';
import ExportProcess from './components/ExportProcess';
import Footer from './components/Footer ';
import Login from './pages/login';
import Register from './pages/Register';
import Documentation  from './pages/Documentation';
import Quotation from './pages/Quotation'
import InvoiceForm from './pages/Forms/InvoiceForm';
import BillOfExchangeForm from './pages/Forms/BillOfExchangeForm';
import QuoteForm from './pages/Forms/QuoteForm'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#183473] text-white">
        <Header />
        <Routes>
          {/* Main pages */}
          <Route
            path="/"
            element={
              <>
                <main className="flex-1">
                  <HeroSection />
                  <FeaturesSection />
                  <ExportProcess />
                </main>
                <Footer />
              </>
            }
          />
          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Register page */}
          <Route
            path="/register"
            element={
              <div className="flex flex-col items-center justify-center min-h-screen">
                <Register />
              </div>
            }
          />

           <Route path='/documentation' element={<Documentation />} />

          <Route path='/quotation' element={<Quotation />} /> 
           <Route path="/invoice-form" element={<InvoiceForm />} />
           <Route path="/bill-of-exchange" element={<BillOfExchangeForm />} />
           <Route path="/pro-forma-invoice" element={<QuoteForm />} />

           
        </Routes>
      </div>
    </Router>
  );
}

export default App;
