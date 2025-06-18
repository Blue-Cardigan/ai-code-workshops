import React, { useState } from 'react';
import { Brain, Code, Users, ArrowRight, BookOpen, Target, Zap, Database } from 'lucide-react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import WorkshopGrid from './components/WorkshopGrid';
import TrackSection from './components/TrackSection';
import Footer from './components/Footer';
import Brochure from './components/Brochure';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'brochure'>('home');

  if (currentView === 'brochure') {
    return <Brochure onBackToHome={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigateToBrochure={() => setCurrentView('brochure')} />
      <Hero />
      <WorkshopGrid />
      <TrackSection />
      <Footer />
    </div>
  );
}

export default App;
