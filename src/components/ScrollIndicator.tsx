import { useState, useEffect } from 'react';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show scroll down indicator when near the top (within 100px)
      setShowScrollDown(scrollTop < 100 && documentHeight > windowHeight + 200);
      
      // Show scroll up indicator when near the bottom (within 100px of bottom)
      setShowScrollUp(scrollTop + windowHeight > documentHeight - 100 && scrollTop > 200);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const workshopsSection = document.getElementById('workshops');
    if (workshopsSection) {
      workshopsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed right-6 z-50 ${className}`}>
      {showScrollDown && (
        <button
          onClick={scrollToNext}
          className="mb-4 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
          style={{ 
            backgroundColor: '#e53a42',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d12c35';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#e53a42';
          }}
          aria-label="Scroll to next section"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
      
      {showScrollUp && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
} 