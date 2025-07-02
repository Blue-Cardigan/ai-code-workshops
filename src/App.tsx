import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import FeaturedWorkshops from './components/FeaturedWorkshops';
import { TestimonialCarousel, ClientCarousel, sampleTestimonials } from './components/Carousel';
import Footer from './components/Footer';
import AllWorkshops from './components/AllWorkshops';
import Questions from './components/Questions';
import ScrollIndicator from './components/ScrollIndicator';
import clientsData from './lib/clients.json';
import { pages, track } from './lib/analytics';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'workshops' | 'questions'>('home');
  const [targetWorkshopId, setTargetWorkshopId] = useState<number | undefined>();

  // Track page views when view changes
  useEffect(() => {
    switch (currentView) {
      case 'home':
        pages.home();
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
    setTargetWorkshopId(undefined);
    setCurrentView('home');
  };

  if (currentView === 'workshops') {
    return <AllWorkshops onBackToHome={handleBackToHome} onNavigateToQuestions={handleNavigateToQuestions} targetWorkshopId={targetWorkshopId} />;
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
      <ScrollIndicator className="bottom-2" />
    </div>
  );
}

export default App;
