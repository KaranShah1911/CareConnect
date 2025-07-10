// Footer.jsx
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1E1E2F] text-gray-300 pt-16 pb-10 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo and Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="CareConnect" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">CareConnect</span>
          </div>
          <p className="text-sm text-gray-400">
            Your trusted partner in connecting patients with certified medical professionals — anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#sectors" className="hover:text-white">Sectors</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@careconnect.com" className="hover:text-white">support@careconnect.com</a></li>
            <li>Phone: <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a></li>
            <li>Address: 123 Health Street, Mumbai, India</li>
          </ul>
        </div>

        {/* Social & Quote */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Stay Connected</h3>
          <div className="flex gap-4 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#5C67F2] transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#5C67F2] transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#5C67F2] transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#5C67F2] transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
          <p className="italic text-sm text-gray-400">
            "Healing is a matter of time, but it is sometimes also a matter of opportunity." – Hippocrates
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CareConnect. All rights reserved.
      </div>
    </footer>
  );
}
