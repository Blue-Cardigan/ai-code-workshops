import React from 'react';
import { Brain, Menu, X, FileText } from 'lucide-react';

interface NavigationProps {
  onNavigateToBrochure?: () => void;
}

const Navigation = ({ onNavigateToBrochure }: NavigationProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const handleGetStarted = () => {
    scrollToSection('workshops');
  };

  const handleBrochureClick = () => {
    if (onNavigateToBrochure) {
      onNavigateToBrochure();
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">AI Code Academy</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('workshops')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Workshops
            </button>
            <button 
              onClick={() => scrollToSection('tracks')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Learning Tracks
            </button>
            {onNavigateToBrochure && (
              <button 
                onClick={handleBrochureClick}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                <FileText size={16} />
                Brochure
              </button>
            )}
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </button>
            <button onClick={handleGetStarted} className="btn-primary">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('workshops')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Workshops
              </button>
              <button 
                onClick={() => scrollToSection('tracks')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Learning Tracks
              </button>
              {onNavigateToBrochure && (
                <button 
                  onClick={handleBrochureClick}
                  className="flex items-center gap-1 w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  <FileText size={16} />
                  Brochure
                </button>
              )}
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                About
              </button>
              <div className="px-3 py-2">
                <button onClick={handleGetStarted} className="btn-primary w-full">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 