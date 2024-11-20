import React from 'react';
import { Globe2 } from 'lucide-react';

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-[#2a4a8f]">
      <a className="flex items-center justify-center" href="/">
        <Globe2 className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-bold text-white">ExportPro</span>
      </a>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" href="/">Home</a>
        <a className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" href="/services">Services</a>
        <a className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" href="/about">About</a>
        <a className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;