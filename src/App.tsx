import { useState, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkshopGrid from './components/WorkshopGrid';
import TrackSection from './components/TrackSection';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load heavy components
const Brochure = lazy(() => import('./components/Brochure'));
const Assessment = lazy(() => import('./components/Assessment'));

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'brochure' | 'assessment'>('home');
  const [brochureAnchor, setBrochureAnchor] = useState<string | undefined>();

  const handleNavigateToBrochure = (anchor?: string) => {
    setBrochureAnchor(anchor);
    setCurrentView('brochure');
  };

  const handleNavigateToAssessment = () => {
    setCurrentView('assessment');
  };

  const handleBackToHome = () => {
    setBrochureAnchor(undefined);
    setCurrentView('home');
  };

  if (currentView === 'brochure') {
    return (
      <Suspense fallback={<LoadingSpinner message="Loading brochure..." />}>
        <Brochure onBackToHome={handleBackToHome} anchor={brochureAnchor} />
      </Suspense>
    );
  }

  if (currentView === 'assessment') {
    return (
      <Suspense fallback={<LoadingSpinner message="Loading assessment..." />}>
        <Assessment onBackToHome={handleBackToHome} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Navigation onNavigateToBrochure={handleNavigateToBrochure} />
      <Hero />
      <WorkshopGrid onNavigateToBrochure={handleNavigateToBrochure} />
      <TrackSection onNavigateToAssessment={handleNavigateToAssessment} />
      <Footer />
    </div>
  );
}

export default App;
