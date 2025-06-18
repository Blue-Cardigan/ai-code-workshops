import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkshopGrid from './components/WorkshopGrid';
import TrackSection from './components/TrackSection';
import Footer from './components/Footer';
import Brochure from './components/Brochure';
import Assessment from './components/Assessment';

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
    return <Brochure onBackToHome={handleBackToHome} anchor={brochureAnchor} />;
  }

  if (currentView === 'assessment') {
    return <Assessment onBackToHome={handleBackToHome} />;
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
