import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection ';
import Footer from './components/Footer ';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#183473] text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      
      </main>
      <Footer />
    </div>
  );
}

export default App;