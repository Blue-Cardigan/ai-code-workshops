import React from 'react';
import { Menu, X, FileText } from 'lucide-react';

interface NavigationProps {
  onNavigateToBrochure?: (anchor?: string) => void;
}

const Navigation = ({ onNavigateToBrochure }: NavigationProps) => {
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

  const handleBrochureClick = () => {
    if (onNavigateToBrochure) {
      onNavigateToBrochure();
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`bg-white/70 backdrop-blur-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <img 
              src="//images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/1539074391576-C311VHNSYIBWQ5VGT9DK/coefficient-logo-and-name-v1.png?format=1500w"
              alt="Coefficient"
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => scrollToSection('home')} 
              className="font-bold transition-colors text-sm tracking-wide uppercase"
              style={{ color: '#ff6f68' }}
            >
              HOME
            </button>
            <button 
              onClick={() => scrollToSection('workshops')} 
              className="font-bold transition-colors text-sm tracking-wide uppercase"
              style={{ color: '#ff6f68' }}
            >
              WORKSHOPS
            </button>
            <button 
              onClick={() => scrollToSection('tracks')} 
              className="font-bold transition-colors text-sm tracking-wide uppercase border-b-2 border-transparent"
              style={{ color: '#ff6f68' }}
            >
              LEARNING TRACKS
            </button>
            {onNavigateToBrochure && (
              <button 
                onClick={handleBrochureClick}
                className="flex items-center gap-1 font-bold transition-colors text-sm tracking-wide uppercase"
                style={{ color: '#ff6f68' }}
              >
                <FileText size={14} />
                BROCHURE
              </button>
            )}
            <button 
              className="font-bold transition-colors text-sm tracking-wide uppercase"
              style={{ color: '#ff6f68' }}
            >
              CONTACT US
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-100">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left px-3 py-3 font-bold text-sm tracking-wide uppercase"
                style={{ color: '#ff6f68' }}
              >
                HOME
              </button>
              <button 
                onClick={() => scrollToSection('workshops')} 
                className="block w-full text-left px-3 py-3 font-bold text-sm tracking-wide uppercase"
                style={{ color: '#ff6f68' }}
              >
                WORKSHOPS
              </button>
              <button 
                onClick={() => scrollToSection('tracks')} 
                className="block w-full text-left px-3 py-3 font-bold text-sm tracking-wide uppercase"
                style={{ color: '#ff6f68' }}
              >
                LEARNING TRACKS
              </button>
              {onNavigateToBrochure && (
                <button 
                  onClick={handleBrochureClick}
                  className="flex items-center gap-1 w-full text-left px-3 py-3 font-bold text-sm tracking-wide uppercase"
                  style={{ color: '#ff6f68' }}
                >
                  <FileText size={14} />
                  BROCHURE
                </button>
              )}
              <button 
                className="block w-full text-left px-3 py-3 font-bold text-sm tracking-wide uppercase"
                style={{ color: '#ff6f68' }}
              >
                CONTACT US
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 