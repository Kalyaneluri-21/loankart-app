import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8  rounded"><img src="https://play-lh.googleusercontent.com/ij3IqRmQAOv20-YlYqHX4PAs2gEbzghbeH7gqV727IVYiDKXTIilgvXRUmzVMppubig" alt="" /></div>
              <h3 className="text-xl font-bold">LoanKart</h3>
            </div>
            <p className="text-gray-400">Making loans simple, fast, and affordable for everyone.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Loans</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Personal Loan</a></li>
              <li><a href="/" className="hover:text-white">Education Loan</a></li>
              <li><a href="/" className="hover:text-white">Home Loan</a></li>
              <li><a href="/" className="hover:text-white">Business Loan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/" className="hover:text-white">Contact</a></li>
              <li><a href="/" className="hover:text-white">Careers</a></li>
              <li><a href="/" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Help Center</a></li>
              <li><a href="/" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </motion.div>
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 LoanKart. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;