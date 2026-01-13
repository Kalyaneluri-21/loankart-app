import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastClasses = (type) => {
    const baseClasses = 'fixed top-5 right-5 px-5 py-3 rounded-lg text-white font-bold z-50 flex items-center justify-between min-w-80 shadow-lg animate-slide-in';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-green-600`;
      case 'error':
        return `${baseClasses} bg-red-600`;
      case 'warning':
        return `${baseClasses} bg-yellow-500 text-gray-900`;
      case 'info':
        return `${baseClasses} bg-blue-600`;
      default:
        return `${baseClasses} bg-gray-600`;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={getToastClasses(type)}
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        <span>{message}</span>
        <motion.button 
          onClick={onClose}
          className="bg-transparent border-none text-inherit text-lg cursor-pointer ml-3 p-0 leading-none"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;