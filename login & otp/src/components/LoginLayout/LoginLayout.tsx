import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LoginLayoutProps {
  children: ReactNode;
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Image */}
      <div className="hidden lg:flex lg:w-2/5 relative">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2022/01/Trichy-Tamil-Nadu-1.jpg?fit=1024%2C672&ssl=1"
          alt="Trichy Temple"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl">Experience the beauty of Tamil Nadu</p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:w-3/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="https://i.imgur.com/trNtPvq.png"
              alt="Logo"
              className="h-24 w-auto object-contain" // Increased height from h-12 to h-24
            />
          </div>

          {/* Main Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {children}
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};