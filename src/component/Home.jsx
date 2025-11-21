import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Documents with
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              AI-Powered Intelligence
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of document processing. Extract insights, analyze content, and unlock the power of your documents with cutting-edge AI technology.
          </p>

          {/* CTA Button - Centered */}
          <div className="flex justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 sm:px-10 sm:py-5 text-lg sm:text-xl font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Additional Features/Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Accurate</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">Fast</div>
              <div className="text-gray-600 font-medium">Processing</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">Secure</div>
              <div className="text-gray-600 font-medium">Data Protection</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

