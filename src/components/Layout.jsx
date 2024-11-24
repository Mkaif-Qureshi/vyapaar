import { Outlet } from "react-router-dom";
import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer ";

const Layout = () => {
  return (
    <div className="relative">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 right-0 z-50 w-full" />

      {/* Content Wrapper */}
      <div className="mt-[var(--header-height)]"> {/* Adjust padding based on header height */}
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
