
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span 
              onClick={() => navigate('/')} 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              CTRL Tech
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <span 
              onClick={() => navigate('/services')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              IT Services
            </span>
            <span 
              onClick={() => navigate('/ai-services')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              AI Services
            </span>
            <span 
              onClick={() => navigate('/industries')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              Industries
            </span>
            <span 
              onClick={() => navigate('/locations')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              Locations
            </span>
            <span 
              onClick={() => navigate('/about')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              About
            </span>
            <span 
              onClick={() => navigate('/contact')} 
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              Contact
            </span>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <span 
              onClick={() => navigate('/admin/login')} 
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              Admin Login
            </span>
            <Button 
              onClick={scrollToContact}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Get Started
            </Button>
          </div>
          
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-4 pb-6 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <span 
                onClick={() => { navigate('/services'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                IT Services
              </span>
              <span 
                onClick={() => { navigate('/ai-services'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                AI Services
              </span>
              <span 
                onClick={() => { navigate('/industries'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                Industries
              </span>
              <span 
                onClick={() => { navigate('/locations'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                Locations
              </span>
              <span 
                onClick={() => { navigate('/about'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                About
              </span>
              <span 
                onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                Contact
              </span>
              <span 
                onClick={() => { navigate('/admin/login'); setMobileMenuOpen(false); }} 
                className="text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                Admin Login
              </span>
              <Button 
                onClick={() => { scrollToContact(); setMobileMenuOpen(false); }}
                className="bg-blue-600 text-white w-full py-2 rounded-full hover:bg-blue-700"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
