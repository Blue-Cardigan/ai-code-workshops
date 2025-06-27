import { useState, lazy, Suspense, useEffect } from 'react';
import Hero from './components/Hero';
import FeaturedWorkshops from './components/FeaturedWorkshops';
import { TestimonialCarousel, ClientCarousel, sampleTestimonials } from './components/Carousel';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import AllWorkshops from './components/AllWorkshops';
import Questions from './components/Questions';
import clientsData from './lib/clients.json';
import { pages, track } from './lib/analytics';

// Lazy load heavy components
const Brochure = lazy(() => import('./components/Brochure'));

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'brochure' | 'workshops' | 'questions'>('home');
  const [brochureAnchor, setBrochureAnchor] = useState<string | undefined>();
  const [targetWorkshopId, setTargetWorkshopId] = useState<number | undefined>();

  // Track page views when view changes
  useEffect(() => {
    switch (currentView) {
      case 'home':
        pages.home();
        break;
      case 'brochure':
        pages.brochure();
        break;
      case 'workshops':
        pages.workshops();
        break;
      case 'questions':
        pages.assessment();
        break;
    }
  }, [currentView]);

  const handleNavigateToWorkshops = (workshopId?: number) => {
    setTargetWorkshopId(workshopId);
    setCurrentView('workshops');
    track.navigationClicked('workshops', currentView);
  };

  const handleNavigateToQuestions = () => {
    setCurrentView('questions');
    track.heroCtaClick('assessment');
  };

  const handleBackToHome = () => {
    setBrochureAnchor(undefined);
    setTargetWorkshopId(undefined);
    setCurrentView('home');
  };

  if (currentView === 'brochure') {
    return (
      <Suspense fallback={<LoadingSpinner message="Loading brochure..." />}>
        <Brochure onBackToHome={handleBackToHome} anchor={brochureAnchor} />
      </Suspense>
    );
  }

  if (currentView === 'workshops') {
    return <AllWorkshops onBackToHome={handleBackToHome} targetWorkshopId={targetWorkshopId} />;
  }

  if (currentView === 'questions') {
    return <Questions onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Hero onNavigateToQuestions={handleNavigateToQuestions} />
      <FeaturedWorkshops onNavigateToWorkshops={handleNavigateToWorkshops} />
      <ClientCarousel clients={clientsData.clients} />
      <TestimonialCarousel testimonials={sampleTestimonials} />
      <Footer />
    </div>
  );
}

export default App;
