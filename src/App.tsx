import { useState, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedWorkshops from './components/FeaturedWorkshops';
import { TestimonialCarousel, ClientCarousel, sampleTestimonials } from './components/Carousel';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import AllWorkshops from './components/AllWorkshops';
import Questions from './components/Questions';
import clientsData from '../clients.json';

// Lazy load heavy components
const Brochure = lazy(() => import('./components/Brochure'));

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'brochure' | 'workshops' | 'questions'>('home');
  const [brochureAnchor, setBrochureAnchor] = useState<string | undefined>();
  const [targetWorkshopId, setTargetWorkshopId] = useState<number | undefined>();

  const handleNavigateToWorkshops = (workshopId?: number) => {
    setTargetWorkshopId(workshopId);
    setCurrentView('workshops');
  };

  const handleNavigateToQuestions = () => {
    setCurrentView('questions');
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
      <Navigation />
      <Hero onNavigateToQuestions={handleNavigateToQuestions} />
      <FeaturedWorkshops onNavigateToWorkshops={handleNavigateToWorkshops} />
      <ClientCarousel clients={clientsData.clients} />
      <TestimonialCarousel testimonials={sampleTestimonials} />
      <Footer />
    </div>
  );
}

export default App;
