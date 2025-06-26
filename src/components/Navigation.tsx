import React from 'react';
import { Menu, X, Calendar, MessageSquare } from 'lucide-react';


const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down and past 100px
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav 
      className={`bg-white/95 backdrop-blur-md border-b border-neutral-200/50 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
            <img 
              src="//images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/1539074391576-C311VHNSYIBWQ5VGT9DK/coefficient-logo-and-name-v1.png?format=1500w"
              alt="Coefficient"
              className="h-8 w-auto group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group py-2"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
            </button>
            <button 
              onClick={() => scrollToSection('workshops')} 
              className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group py-2"
            >
              Workshops
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="btn-secondary group text-sm py-2 px-4 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get Quote
            </button>
            <button className="btn-primary group text-sm py-2 px-4 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Book Call
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-neutral-200/50">
            <div className="py-4 space-y-2 bg-white/95 backdrop-blur-sm">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 font-medium transition-colors duration-200 rounded-lg"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('workshops')} 
                className="block w-full text-left px-4 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 font-medium transition-colors duration-200 rounded-lg"
              >
                Workshops
              </button>
              <div className="px-4 pt-4 space-y-3 border-t border-neutral-200/50 mt-4">
                <button className="btn-secondary w-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Quote
                </button>
                <button className="btn-primary w-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Call
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