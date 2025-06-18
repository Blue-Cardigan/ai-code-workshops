import React from 'react';
import { ArrowRight, Code, Brain, Zap } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartLearning = () => {
    scrollToSection('workshops');
  };

  const handleViewWorkshops = () => {
    scrollToSection('workshops');
  };

  return (
    <section id="home" className="relative overflow-hidden bg-white py-20 lg:py-32">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-pink-50 organic-blob opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-50 organic-blob opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-50 organic-blob opacity-30"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-pink-50 px-4 py-2 rounded-full mb-8">
            <Brain className="h-4 w-4 text-pink-600" />
            <span className="text-sm font-medium text-pink-700">AI-Enhanced Development</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            How can AI solve your{' '}
            <span className="text-gray-700">coding challenges?</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            AI Code Academy is a learning platform offering end-to-end 
            workshops in AI-assisted development, from zero-to-one coding 
            to advanced engineering practices, as well as bespoke 
            training courses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button 
              onClick={handleStartLearning}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={handleViewWorkshops}
              className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>View Workshops</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-lg mx-auto mb-4">
                <Code className="h-6 w-6 text-pink-600" />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">13+</div>
              <div className="text-gray-600">Workshops</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">6</div>
              <div className="text-gray-600">Learning Tracks</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4">
                <Brain className="h-6 w-6 text-gray-600" />
              </div>
              <div className="text-3xl font-semibold text-gray-900 mb-1">AI-Powered</div>
              <div className="text-gray-600">Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 