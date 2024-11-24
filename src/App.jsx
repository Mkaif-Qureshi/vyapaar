import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection '
import ExportProcess from './components/ExportProcess';
import Login from './pages/login';
import Register from './pages/Register';
import Documentation from './pages/Documentation';
import Quotation from './pages/Forms/Quotation';
import InvoiceForm from './pages/Forms/InvoiceForm';
import BillOfExchangeForm from './pages/Forms/BillOfExchangeForm';
import QuoteForm from './pages/Forms/QuoteForm';
import FAQ from './pages/FAQ';
import Chat from './pages/Chat'

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped with Layout */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <ExportProcess />
              </main>
            }
          />
          <Route path="/documentation" element={<Documentation />} />s
          <Route path="/faqs" element={<FAQ />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/invoice-form" element={<InvoiceForm />} />
          <Route path="/bill-of-exchange" element={<BillOfExchangeForm />} />
          <Route path="/pro-forma-invoice" element={<QuoteForm />} />
          
          <Route path="/chat" element={<Chat/>} />

        </Route>

        {/* Routes without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
