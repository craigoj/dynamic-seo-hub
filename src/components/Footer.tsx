
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              Leading nationwide provider of managed IT services and AI automation for businesses of all sizes.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/cybersecurity" className="hover:text-white">Cybersecurity</Link></li>
              <li><Link to="/services/cloud-solutions" className="hover:text-white">Cloud Solutions</Link></li>
              <li><Link to="/services/it-infrastructure" className="hover:text-white">IT Support</Link></li>
              <li><Link to="/services/network-management" className="hover:text-white">Network Management</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>info@ctrltechhq.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link to="/admin/login" className="hover:text-white">Admin Login</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; 2025 CTRL Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
