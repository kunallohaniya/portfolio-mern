import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">KL</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold text-dark-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Kunal Lohaniya
        </motion.h2>

        {/* Loading Dots */}
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 dark:bg-dark-700 rounded-full mt-8 mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="text-sm text-gray-600 dark:text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Loading amazing content...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
