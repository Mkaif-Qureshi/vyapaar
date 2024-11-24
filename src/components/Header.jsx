import React, { useState, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // for navigation

  // Check authentication status on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home after logout
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-[#183473] border-[#2a4a8f]">
      <Link className="flex items-center justify-center" to="/">
        <Globe2 className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-bold text-white">Vyapaar</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {isAuthenticated ? (
          <>
            {/* Show these links if the user is authenticated */}
            <Link className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors" to="/Documentation">
              Documentation
            </Link>
            <Link className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors" to="/chat">
              Chat with us 
            </Link>
            <Link className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors" to="/services">
              Services
            </Link>
            <Link className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors" to="/faqs">
            FAQs
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:text-[#a8c0ff] text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Show Login and Register links if not authenticated */}
            <Link className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" to="/login">
              Login
            </Link>
            <Link className="text-sm font-medium hover:text-[#a8c0ff] transition-colors" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
