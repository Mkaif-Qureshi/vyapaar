import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo  from "../assets/logo.svg";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    };

    window.addEventListener("storage", checkAuthStatus);
    checkAuthStatus();
    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="px-4 fixed w-full lg:px-6 h-16 flex items-center border-b bg-[#183473] border-[#2a4a8f] z-50">
     <Link className="flex items-center" to="/">
        <div className="logo-container flex items-center space-x-2 bg-transparent"> {/* Ensure the container has a transparent background */}
          <img
            width={40}
            height={40}
            src={Logo}
            alt="logo"
            className="bg-transparent"  // Apply transparent background to the image itself (though this may be redundant)
            curve-radius="50%"
          />
          <span className="text-lg font-bold text-white">Vyapaar</span>
        </div>
      </Link>


      <nav className="ml-auto flex gap-4 sm:gap-6">
        {isAuthenticated ? (
          <>
            <Link
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              to="/Documentation"
            >
              Documentation
            </Link>
            <Link
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              to="/chat"
            >
              Chat with us
            </Link>
            <Link
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              to="/faqs"
            >
              FAQs
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
