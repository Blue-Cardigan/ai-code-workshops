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
}

interface FeaturedWorkshopsProps {
  onNavigateToWorkshops?: (workshopId?: number) => void;
}

const featuredWorkshops: FeaturedWorkshop[] = [
  {
    id: 1,
    title: "Intro to Vibe Coding: Build & Deploy Your First AI App",
    description: "Use Lovable + Cursor to scaffold and deploy a simple app with AI-assisted code generation. Perfect for beginners who want to start their AI development journey.",
    duration: "4 hours",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Popular"
  },
  {
    id: 4,
    title: "Refactor Like a Pro: Clean Code with AI Pairing Tools",
    description: "Master refactoring principles with LLM copilots like CodeRabbit. Learn DRY principles, abstraction, and professional code quality standards.",
    duration: "4 hours", 
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Staff Pick"
  },
  {
    id: 8,
    title: "Cursor + Claude + GitHub: Full Workflow Mastery",
    description: "End-to-end modern development workflow using AI-powered IDEs, model-assisted code review, testing, and deployment automation.",
    duration: "4 hours",
    level: "Advanced", 
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller"
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
      <section id="workshops" className="relative">
        {/* Tilted background container - extended beyond section bounds */}
        <div 
          className="absolute transform -rotate-3" 
          style={{ 
            backgroundColor: '#e53a42',
            width: '150%',
            height: '120%',
            top: '-15%',
            left: '-25%'
          }}
        ></div>
      
      {/* Straight grid overlay */}
      <div 
        className="absolute" 
        style={{ 
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          width: '100%',
          height: '130%',
          top: '-20%',
          left: '0'
        }}
      ></div>
      
      <div className="relative z-10 container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          
          {/* Left side - Explanatory text */}
          <div className="text-white space-y-6">
            <h2 className="text-6xl md:text-7xl font-bold leading-tight text-white">
              Made for Humans.
            </h2>
            
            <div className="text-2xl md:text-3xl leading-relaxed font-bold space-y-4 opacity-80">
              <p>
                Coefficient has been applying AI to business and government since 2017.
              </p>
            </div>
              
            <div className="text-xl leading-relaxed space-y-4">
              <p>
                We created these workshops because we believe everyone should have access to cutting-edge tools 
                that amplify human potential.
              </p>
              
              <p>
              Among us are developers and AI enthusiasts across levels, meaning we understand the challenges you face. 
              We provide practical, hands-on courses that are enjoyable and immediately applicable. 
              </p>
            </div>
            
            {/* Logo */}
            <div className="mt-8 flex justify-center">
              <img 
                src="/coeff-logo-no-text.png" 
                alt="Coefficient" 
                className="h-24 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Right side - Workshop cards */}
          <div className="space-y-8">
            {featuredWorkshops.map((workshop, index) => (
              <button 
                key={workshop.id} 
                onClick={() => handleLearnMore(workshop.id)}
                className="w-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 group hover:bg-white hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative overflow-hidden shadow-xl border border-white/20 cursor-pointer text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Badge positioned absolutely */}
                {workshop.badge && (
                  <div className={`absolute top-4 right-4 ${getBadgeColor(workshop.badge)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10`}>
                    {workshop.badge}
                  </div>
                )}

                <div className="flex gap-6">
                  {/* Enhanced image */}
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-xl shadow-lg">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(workshop.level)}`}>
                          {workshop.level}
                        </span>
                        <div className="flex items-center text-sm text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="font-medium">{workshop.duration}</span>
                        </div>
                      </div>

                      <div className="relative h-20 mb-3 overflow-hidden">
                        {/* Title - visible by default, hidden on hover */}
                        <h3 className="absolute inset-0 text-lg font-bold text-neutral-900 leading-tight transition-all duration-300 transform group-hover:opacity-0 group-hover:-translate-y-2">
                          {workshop.title}
                        </h3>

                        {/* Description - hidden by default, visible on hover */}
                        <p className="absolute inset-0 text-sm text-neutral-600 leading-relaxed opacity-0 translate-y-2 transition-all duration-300 transform group-hover:opacity-100 group-hover:translate-y-0 line-clamp-4">
                          {workshop.description}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Subtle hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Click indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-neutral-600" />
                </div>
              </button>
            ))}

            {/* Browse All Workshops Link */}
            <div className="flex justify-end pb-6">
              <button 
                onClick={() => onNavigateToWorkshops?.(undefined)}
                className="inline-flex items-center text-white hover:text-white/80 transition-colors group"
              >
                <span className="text-lg font-medium">Browse All Workshops</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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