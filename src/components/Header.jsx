import React, { useState, useEffect } from "react";
import { Globe2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    };

    // Listen for storage changes (in case another tab updates localStorage)
    window.addEventListener("storage", checkAuthStatus);

    // Initial authentication check
    checkAuthStatus();

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <header className="px-4 fixed w-full lg:px-6 h-16 flex items-center border-b bg-[#183473] border-[#2a4a8f] z-50">
      {/* Logo and Title */}
      <Link className="flex items-center justify-center" to="/">
        <Globe2 className="h-6 w-6 text-white" aria-label="Globe Icon" />
        <span className="ml-2 text-lg font-bold text-white">Vyapaar</span>
      </Link>

      {/* Navigation Links */}
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {isAuthenticated ? (
          <>
            {/* Authenticated User Links */}
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
            {/* Non-Authenticated User Links */}
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
