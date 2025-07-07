import { Clock, ArrowRight } from 'lucide-react';
import { track } from '../lib/analytics';

interface FeaturedWorkshop {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
  badge?: string;
  software: string[];
}

interface FeaturedWorkshopsProps {
  onNavigateToWorkshops?: (workshopId?: number) => void;
}

const featuredWorkshops: FeaturedWorkshop[] = [
  {
    id: 1,
    title: "Intro to Vibe Coding: Apps, Tools, and Automations",
    description: "Scaffold and deploy a simple app, then generate scripts and extensions to automate your workflows. Get past the 'I can't code' barrier.",
    duration: "4 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    software: ["Cursor", "GitHub", "Vercel", "Lovable"]
  },
  {
    id: 4,
    title: "Develop Like a Pro: Clean Code with AI Pairing Tools",
    description: "Master good practices with LLM copilots like Cursor and Claude Code. Implement great features that adhere to professional code quality standards.",
    duration: "4 hours", 
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Staff Pick",
    software: ["Cursor", "Claude Code", "CodeRabbit", "GitHub Actions"]
  },
  {
    id: 8,
    title: "Cursor + Claude + GitHub: Full Workflow Mastery",
    description: "End-to-end modern development workflow using AI-powered IDEs, model-assisted code review, testing, and deployment automation.",
    duration: "4 hours",
    level: "Advanced", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "",
    software: ["Cursor (Advanced)", "Claude Code", "CodeRabbit", "Jest"]
  }
];

const FeaturedWorkshops = ({ onNavigateToWorkshops }: FeaturedWorkshopsProps) => {
  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800', 
      'Advanced': 'bg-blue-100 text-blue-800',
      'Expert': 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Popular': 'bg-gradient-to-r from-green-500 to-green-600',
      'Staff Pick': 'bg-gradient-to-r from-purple-500 to-purple-600',
      'Best Seller': 'bg-gradient-to-r from-orange-500 to-orange-600'
    };
    return colors[badge as keyof typeof colors] || 'bg-gradient-to-r from-blue-500 to-blue-600';
  };

  const handleLearnMore = (workshopId: number) => {
    const workshop = featuredWorkshops.find(w => w.id === workshopId);
    if (workshop) {
      track.workshopInterest(workshopId, workshop.title, 'featured');
    }
    onNavigateToWorkshops?.(workshopId);
  };

  return (
    <div style={{ overflowX: 'clip' }}>
      <section id="workshops" className="relative py-6 sm:py-16 lg:py-20">
        {/* Tilted background container - responsive coverage */}
        <div 
          className="absolute transform -rotate-3 featured-bg-mobile sm:featured-bg-desktop" 
          style={{ 
            backgroundColor: '#e53a42',
            width: '150%',
            left: '-25%'
          }}
        ></div>
      
      {/* Straight grid overlay */}
      <div 
        className="absolute featured-grid-mobile sm:featured-grid-desktop" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          width: '100%',
          left: '0'
        }}
      ></div>
      
      <div className="relative z-10 container-wide">
        {/* Main heading spanning full width - Improved responsive scaling */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white mb-6 sm:mb-12 text-left">
          Made for Humans.
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[60vh]">
          
          {/* Left side - Explanatory text - Improved mobile layout */}
          <div className="text-white space-y-4 sm:space-y-6">
            <div className="text-xl sm:text-2xl lg:text-3xl leading-relaxed font-bold space-y-3 sm:space-y-4 opacity-80">
              <p>
                Coefficient has been applying AI to business and government since 2017.
              </p>
            </div>
              
            <div className="text-base sm:text-lg lg:text-xl leading-relaxed space-y-3 sm:space-y-4">
              <p>
                We created these workshops because we believe in using these tools to amplify, not replace, the workforce.
              </p>
              
              <p>
              Among us are developers and AI users across levels and roles, meaning we understand the challenges you face. 
              We provide practical, hands-on courses that are enjoyable and immediately applicable. 
              </p>
            </div>
            
            {/* Logo */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <img 
                src="/coeff-logo-no-text.png" 
                alt="Coefficient" 
                className="h-16 sm:h-20 lg:h-24 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Right side - Workshop cards - Improved mobile layout */}
          <div className="space-y-2 sm:space-y-4">
            {featuredWorkshops.map((workshop, index) => (
              <button 
                key={workshop.id} 
                onClick={() => handleLearnMore(workshop.id)}
                className="w-full bg-white/95 backdrop-blur-sm rounded-md px-3 sm:px-4 pt-3 sm:pt-4 group hover:bg-white hover:scale-[1.01] hover:shadow-xl transition-all duration-300 relative overflow-hidden shadow-lg border border-white/20 cursor-pointer text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge positioned absolutely - Made responsive */}
                {workshop.badge && (
                  <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 ${getBadgeColor(workshop.badge)} text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-lg z-10`}>
                    {workshop.badge}
                  </div>
                )}

                <div className="flex gap-3 sm:gap-4">
                  {/* Enhanced image - Made responsive */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg shadow-md">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content - Improved mobile layout */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${getLevelColor(workshop.level)}`}>
                            {workshop.level}
                          </span>
                          <div className="flex items-center text-xs text-neutral-500 bg-neutral-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                            <Clock className="w-3 h-3 mr-1" />
                            <span className="font-medium">{workshop.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Software badges - Improved mobile layout */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {workshop.software.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-1.5 sm:px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded border border-blue-200 text-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                        {workshop.software.length > 3 && (
                          <span className="px-1.5 sm:px-2 py-0.5 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-200">
                            +{workshop.software.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="relative h-12 sm:h-16 mb-2 overflow-hidden">
                        {/* Title - visible by default, hidden on hover */}
                        <div className="absolute inset-0 flex items-start justify-between transition-all duration-300 transform group-hover:opacity-0 group-hover:-translate-y-2">
                          <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight flex-1 pr-2 line-clamp-2">
                            {workshop.title}
                          </h3>
                        </div>

                        {/* Description - hidden by default, visible on hover - Mobile optimized */}
                        <p className="absolute inset-0 text-xs sm:text-sm text-neutral-600 leading-snug opacity-0 translate-y-2 transition-all duration-300 transform group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3 sm:line-clamp-4">
                          {workshop.description}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Subtle hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
              </button>
            ))}

            {/* Browse All Workshops Link - Improved mobile layout */}
            <div className="flex justify-center sm:justify-end pb-4 sm:pb-6">
              <button 
                onClick={() => onNavigateToWorkshops?.(undefined)}
                className="inline-flex items-center text-white hover:text-white/80 transition-colors group text-center sm:text-left"
              >
                <span className="text-base sm:text-lg font-medium">Browse All Workshops</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default FeaturedWorkshops; 