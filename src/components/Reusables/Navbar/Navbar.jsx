import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import Avatar from "@/components/custom/Buttons/AvatarButton/Avatar";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Developers", href: "#developers" },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">DocuVault</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!isLoggedIn &&
              navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:text-primary focus:bg-gray-100 transition duration-150 ease-in-out"
                >
                  {item.name}
                </button>
              ))}
            {!isLoggedIn ? (
              <Link to="/login">
                <Button className="ml-4">Login</Button>
              </Link>
            ) : (
              <Avatar name={currentUser?.username || ""} />
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden fixed inset-0 z-50 bg-white transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center h-16 px-4 sm:px-6 border-b">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-primary">DocuVault</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
            aria-label="Close mobile menu"
          >
            <X className="block h-6 w-6" />
          </button>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {!isLoggedIn &&
            navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:text-primary focus:bg-gray-100 transition duration-150 ease-in-out"
              >
                {item.name}
              </button>
            ))}
          {!isLoggedIn ? (
            <Link to="/register" className="block w-full">
              <Button className="w-full mt-4">Get Started</Button>
            </Link>
          ) : (
            <div className="px-3 py-2">
              <Avatar name={currentUser?.username || ""} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
