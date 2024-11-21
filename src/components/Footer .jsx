import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#2a4a8f]">
      <p className="text-xs text-[#a8c0ff]">© 2024 Vyapaar. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <a className="text-xs text-[#a8c0ff] hover:text-white transition-colors" href="/terms">
          Terms of Service
        </a>
        <a className="text-xs text-[#a8c0ff] hover:text-white transition-colors" href="/privacy">
          Privacy
        </a>
      </nav>
    </footer>
  );
};

export default Footer;