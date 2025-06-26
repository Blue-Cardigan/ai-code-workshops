import { Clock, ArrowRight } from 'lucide-react';

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
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Made for Humans.
            </h2>
            
            <div className="text-xl md:text-2xl leading-relaxed font-bold space-y-4 max-w-lg opacity-80">
              <p>
                Coefficient has been applying AI to business and government since 2016.
              </p>
            </div>
              
            <div className="text-lg leading-relaxed space-y-4 max-w-lg">
              <p>
                We created these workshops because we believe everyone should have access to cutting-edge tools 
                that amplify human potential.
              </p>
              
              <p>
              Among us are developers and AI enthusiasts across levels, meaning we understand the challenges you face. 
              Our goal is to create practical, hands-on courses that are enjoyable and immediately applicable. 
              </p>
            </div>
            
            {/* Logo */}
            <div className="mt-8 max-w-lg flex justify-center">
              <img 
                src="/coeff-logo-no-text.png" 
                alt="Coefficient" 
                className="h-24 w-auto opacity-80"
              />
            </div>
          </div>

          {/* Right side - Workshop cards */}
          <div className="space-y-6">
            {featuredWorkshops.map((workshop, index) => (
              <div 
                key={workshop.id} 
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 group hover:bg-white hover:scale-105 transition-all duration-300 relative overflow-hidden shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4">
                  {/* Compact image */}
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={workshop.image} 
                      alt={workshop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {workshop.badge && (
                      <div className={`absolute -top-1 -right-1 ${getBadgeColor(workshop.badge)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                        {workshop.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(workshop.level)}`}>
                          {workshop.level}
                        </span>
                        <div className="flex items-center text-xs text-neutral-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{workshop.duration}</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-bold text-neutral-900 mb-2 line-clamp-2">
                        {workshop.title}
                      </h3>

                      <p className="text-xs text-neutral-600 mb-3 line-clamp-2">
                        {workshop.description}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleLearnMore(workshop.id)}
                        className="text-xs bg-neutral-900 text-white px-3 py-2 rounded-lg hover:bg-neutral-800 transition-colors group flex items-center w-fit"
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Button */}
            <div className="flex justify-end pt-4">
              <button 
                onClick={() => onNavigateToWorkshops?.(undefined)}
                className="text-white hover:text-white/80 transition-colors group inline-flex items-center text-sm font-medium"
              >
                Browse All Workshops
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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