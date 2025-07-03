import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, BookOpen, Target, ArrowUp, MessageSquare, Calendar, ChevronUp, PoundSterling, Download, Users, TrendingUp, CheckCircle, Star } from 'lucide-react';
import { track } from '../lib/analytics';

interface Workshop {
  id: number;
  title: string;
  description: string;
  outline: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  prerequisites: string;
  image: string;
  outcome?: string;
  pricing?: {
    basePrice: number;
    teamDiscount?: string;
    popularBadge?: boolean;
  };
  roiMetrics?: {
    timeToValue: string;
    productivityGain: string;
    toolAdoption: string;
  };
}

interface AllWorkshopsProps {
  onBackToHome: () => void;
  onNavigateToQuestions?: () => void;
  targetWorkshopId?: number;
}

const allWorkshops: Workshop[] = [
  // Zero-to-One: Onboarding New Coders + Vibe Coders
  {
    id: 1,
    title: "Intro to Vibe Coding: Build & Deploy Your First AI App",
    description: "Scaffold and deploy a simple app with AI-assisted code generation, and write scripts and extensions to automate your workflows. Perfect for beginners who want to start their AI development journey.",
    outline: [
      "Use Lovable + Cursor + Vercel to scaffold and deploy a simple app with AI-assisted code generation",
      "Learn prompt→code→debug loop and version control basics",
      "GitHub fundamentals and deployment via Vercel",
      "Automate document processing and browser usage with scripts and extensions",
      "Understand AI coding assistants and their capabilities",
      "Build confidence in technology experimentation"
    ],
    duration: "4 hours",
    level: "beginner",
    category: "Zero-to-One",
    prerequisites: "None",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    outcome: "Hello World AI app deployed live",
    pricing: {
      basePrice: 400,
      teamDiscount: "15% off for 11+ people",
      popularBadge: true
    },
    roiMetrics: {
      timeToValue: "Same day",
      productivityGain: "2x faster development",
      toolAdoption: "95% immediate usage"
    }
  },
  {
    id: 3,
    title: "Git & GitHub for Beginners (w/ AI Helpers)",
    description: "Version control fundamentals using AI-assisted tools. Learn collaborative development with intelligent commit assistance and GitHub workflows.",
    outline: [
      "Version control fundamentals using Cursor or GitHub Copilot",
      "Integrated commit assistance and pre-commit hooks",
      "Managing merge conflicts and branch strategies",
      "AI-generated commit messages and documentation",
      "Collaborative development workflows"
    ],
    duration: "4 hours",
    level: "beginner",
    category: "Zero-to-One",
    prerequisites: "Optional follow-on from previous workshops",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 400,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Within 1 week",
      productivityGain: "50% fewer conflicts",
      toolAdoption: "100% team adoption"
    }
  },

  // Vibe-to-Engineer: Professionalising Your AI-Assisted Coding
  {
    id: 4,
    title: "Develop Like a Pro: Clean Code with AI Pairing Tools",
    description: "Master good practices with LLM copilots like Cursor and Claude Code. Implement ambitious features that adhere to professional code quality standards.",
    outline: [
      "Fluently use LLM copilots like Cursor & CodeRabbit",
      "Automated linting, commenting, and documentation using Cursor Rules",
      "Real examples and team collaboration exercises",
      "Code review processes with AI assistance"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Some coding comfort assumed (Python/JS)",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 600,
      teamDiscount: "15% off for 11+ people",
      popularBadge: true
    },
    roiMetrics: {
      timeToValue: "Within 2 days",
      productivityGain: "3x faster feature delivery",
      toolAdoption: "90% daily usage"
    }
  },
  {
    id: 5,
    title: "From Playground to Production: CI/CD and Cursor Rules",
    description: "Learn to deploy AI applications professionally with proper infrastructure, monitoring, and best practices for production environments.",
    outline: [
      "App scaffolding and project structure best practices",
      "Deployment patterns: Vercel, Streamlit, AWS",
      "Infrastructure-as-code basics and environment management",
      "Optional stacks e.g React+Firebase, Django+GCP, or FastAPI+Railway",
      "Monitoring and maintenance of AI-powered applications"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Basic Git + coding fluency required",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 600,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Within 1 week",
      productivityGain: "5x faster deployment",
      toolAdoption: "100% production readiness"
    }
  },
  {
    id: 6,
    title: "Testing in the Age of Copilot",
    description: "AI-assisted test generation and test-driven development. Learn to write comprehensive tests with AI assistance and maintain code quality.",
    outline: [
      "AI-assisted test generation (unit, integration)",
      "Test-driven development using Cursor/Copilot",
      "Property-based testing with Hypothesis and similar tools",
      "Automated testing pipelines and continuous integration",
      "Quality assurance for AI-generated code"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Python or JavaScript experience required",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 600,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Immediate",
      productivityGain: "80% fewer bugs",
      toolAdoption: "95% test coverage"
    }
  },
  // AI-Enhanced Software Engineering Best Practices
  {
    id: 7,
    title: "Cursor + Claude + GitHub: Full Workflow Mastery",
    description: "End-to-end modern development workflow using AI-powered IDEs, model-assisted code review, testing, and deployment automation.",
    outline: [
      "End-to-end tour of modern development using AI-powered IDEs",
      "Model-assisted code review, testing, and deployment",
      "Advanced IDE integrations and productivity techniques",
      "Custom workflow optimization for your technology stack",
      "Collaborative development with AI assistance"
    ],
    duration: "4 hours",
    level: "advanced",
    category: "AI-Enhanced Software Engineering Best Practices",
    prerequisites: "For developers looking to level up",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 750,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Same day",
      productivityGain: "4x workflow efficiency",
      toolAdoption: "100% team standardization"
    }
  },
  {
    id: 8,
    title: "CI/CD in a Vibe Coding World",
    description: "Integrate modern CI/CD pipelines with AI-powered development workflows for automated testing, deployment, and quality assurance.",
    outline: [
      "Integrating GitHub Actions with AI-powered code pipelines",
      "Automated testing, security scanning, and deployment triggers",
      "Quality gates and AI-assisted code review processes",
      "Infrastructure automation and environment management",
      "Monitoring and observability for AI-enhanced applications"
    ],
    duration: "4 hours",
    level: "advanced",
    category: "AI-Enhanced Software Engineering Best Practices",
    prerequisites: "Comfort with Git required",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 750,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Within 1 week",
      productivityGain: "10x deployment speed",
      toolAdoption: "100% automated pipeline"
    }
  },
  {
    id: 9,
    title: "Secure by Design: DevSecOps for AI-Era Engineers",
    description: "Security-first approach to AI development with automated security scanning, secrets management, and secure deployment practices.",
    outline: [
      "Secrets management and secure coding practices",
      "Vulnerability scanning and AI-generated security policies",
      "IAM configuration and access control automation",
      "Security considerations for AI model deployment",
      "Pitfalls of LLM misuse in production environments"
    ],
    duration: "4 hours",
    level: "advanced",
    category: "AI-Enhanced Software Engineering Best Practices",
    prerequisites: "Deployment familiarity required",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 750,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Immediate",
      productivityGain: "90% fewer vulnerabilities",
      toolAdoption: "100% security compliance"
    }
  },

  // AI for Data & ML Engineers
  {
    id: 10,
    title: "AI-Assisted Notebooks: Coding Faster with GPT in Jupyter",
    description: "Accelerate data analysis and visualization with AI assistance directly in Jupyter notebooks. Perfect introduction for data professionals.",
    outline: [
      "Clean, explore, and visualise data with GPT integration",
      "Jupyter AI extensions and productivity enhancements",
      "Optional tools: CoCalc, Cursor, advanced notebook environments",
      "Automated data analysis and insight generation",
      "Documentation and reproducibility best practices"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "AI for Data & ML Engineers",
    prerequisites: "Great intro for data analysts or scientists",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 600,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Same day",
      productivityGain: "3x faster analysis",
      toolAdoption: "95% notebook usage"
    }
  },
  {
    id: 11,
    title: "Fine-Tuning the Vibes: Training and Evaluating LLMs",
    description: "Advanced machine learning techniques for training, fine-tuning, and evaluating large language models in production environments.",
    outline: [
      "Prompt tuning, LoRA, and parameter-efficient training",
      "Retrieval-augmented generation (RAG) implementation",
      "Model evaluation frameworks and performance metrics",
      "Tools: Axolotl, Haystack, and Weights & Biases",
      "Production deployment and scaling considerations"
    ],
    duration: "4 hours",
    level: "expert",
    category: "AI for Data & ML Engineers",
    prerequisites: "ML background required",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    pricing: {
      basePrice: 800,
      teamDiscount: "15% off for 11+ people"
    },
    roiMetrics: {
      timeToValue: "Within 2 weeks",
      productivityGain: "5x model performance",
      toolAdoption: "100% production ML"
    }
  }
];

const AllWorkshops = ({ onBackToHome, onNavigateToQuestions, targetWorkshopId }: AllWorkshopsProps) => {
  const [searchTerm] = useState('');
  const [selectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(targetWorkshopId || null);
  const [showFloatingActions, setShowFloatingActions] = useState(false);
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Scroll to target workshop when component mounts
  useEffect(() => {
    if (targetWorkshopId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`workshop-${targetWorkshopId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setExpandedWorkshop(targetWorkshopId);
        }
        
        // Track workshop view
        const workshop = allWorkshops.find(w => w.id === targetWorkshopId);
        if (workshop) {
          track.workshopViewed(workshop.id, workshop.title);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [targetWorkshopId]);

  // Floating actions scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowFloatingActions(scrollTop > 200);
      setShowFloatingButton(scrollTop > 200);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsFloatingExpanded(false);
  };

  const handleGetQuote = () => {
    if (onNavigateToQuestions) {
      onNavigateToQuestions();
      track.consultationRequested('all-workshops-floating');
    }
  };

  const handleBookCall = () => {
    track.consultationRequested('all-workshops-floating');
  };

  const handleDownloadGuide = () => {
    track.leadMagnetDownloaded('ai-transformation-guide');
    // Implement download logic
  };

  const filteredWorkshops = allWorkshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || workshop.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 border-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      advanced: 'bg-blue-100 text-blue-800 border-blue-200',
      expert: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const categories = [
    {
      name: 'Zero-to-One',
      description: 'Perfect for complete beginners and non-technical team members',
      color: 'bg-green-500',
      count: allWorkshops.filter(w => w.category === 'Zero-to-One').length
    },
    {
      name: 'Vibe-to-Engineer',
      description: 'Level up junior to intermediate developers',
      color: 'bg-blue-500',
      count: allWorkshops.filter(w => w.category === 'Vibe-to-Engineer').length
    },
    {
      name: 'AI-Enhanced Software Engineering Best Practices',
      description: 'Advanced workflows for senior engineers',
      color: 'bg-purple-500',
      count: allWorkshops.filter(w => w.category === 'AI-Enhanced Software Engineering Best Practices').length
    },
    {
      name: 'AI for Data & ML Engineers',
      description: 'Specialized training for data science teams',
      color: 'bg-red-500',
      count: allWorkshops.filter(w => w.category === 'AI for Data & ML Engineers').length
    }
  ];

  const totalCompaniesServed = 200;
  const averageROI = 340;

  return (
    <div className="min-h-screen bg-neutral-50 relative">
      {/* Lead Magnet Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Download className="w-5 h-5" />
            <span className="font-medium">FREE Guide: "Complete AI Transformation Roadmap for London Businesses"</span>
          </div>
          <button 
            onClick={handleDownloadGuide}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
          >
            Download Now
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      {showFloatingButton && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            <button
              onClick={() => setIsFloatingExpanded(!isFloatingExpanded)}
              className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
              style={{
                background: isFloatingExpanded ? '#d12c35' : '#e53a42',
                transform: isFloatingExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <ChevronUp className="w-6 h-6" />
            </button>

            {/* Expanded Actions */}
            {isFloatingExpanded && (
              <div className="absolute top-16 left-0 space-y-3 animate-fade-in">
                <button
                  onClick={scrollToTop}
                  className="flex items-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 min-w-max group"
                >
                  <ArrowUp className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  <span className="font-medium">Back to Top</span>
                </button>
                
                <button
                  onClick={handleGetQuote}
                  className="flex items-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 min-w-max group"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                  <span className="font-medium">Get a Quote</span>
                </button>
                
                <button
                  onClick={handleBookCall}
                  className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 min-w-max"
                  style={{ backgroundColor: '#e53a42' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d12c35';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e53a42';
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Book a Call</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="pt-16 relative" style={{ backgroundColor: '#e53a42' }}>
        {/* Grid overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBackToHome}
            className="flex items-center text-white hover:text-white/80 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">All Workshops</h1>
            <p className="text-xl text-white/90 max-w-3xl mb-3">
              Complete catalog of our AI development training programs. From absolute beginners to expert-level practitioners.
            </p>
            
            {/* Competitive Differentiation */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalCompaniesServed}+</div>
                  <div className="text-white/80 text-sm">London companies trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{averageROI}%</div>
                  <div className="text-white/80 text-sm">Average ROI within 6 months</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4 hrs</div>
                  <div className="text-white/80 text-sm">Per workshop (vs 5-day courses)</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/70">
              <span>✓ Hands-on practical training</span>
              <span>✓ Industry-specific customization</span>
              <span>✓ Immediate business application</span>
              <span>✓ Follow-up support included</span>
            </div>
          </div>

          {/* Categories Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedCategory === category.name
                    ? 'bg-white border-white/50 shadow-md ring-2 ring-white/30'
                    : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 ${category.color} rounded-full mr-2`} />
                    <h3 className={`font-semibold ${selectedCategory === category.name ? 'text-gray-900' : 'text-white'}`}>
                      {category.name}
                    </h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.name ? 'bg-gray-100 text-gray-600' : 'bg-white/20 text-white'
                  }`}>
                    {category.count}
                  </span>
                </div>
                <p className={`text-sm ${selectedCategory === category.name ? 'text-gray-600' : 'text-white/80'}`}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} id={`workshop-${workshop.id}`} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 h-fit" style={{ borderColor: '#e53a42' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(workshop.level)}`}>
                    {workshop.level}
                  </span>
                  {workshop.pricing?.popularBadge && (
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-neutral-900">
                    {workshop.title}
                  </h3>
                </div>

                <p className="text-neutral-600 mb-3">
                  {workshop.description}
                </p>

                {/* Pricing Section */}
                {workshop.pricing && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <PoundSterling className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">£{workshop.pricing.basePrice}</span>
                        <span className="text-sm text-gray-600">per person</span>
                      </div>
                      <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        {workshop.pricing.teamDiscount}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600">
                      Volume discounts: 25% off for 25+ people • Minimum 8 participants
                    </div>
                  </div>
                )}

                {/* ROI Metrics */}
                {workshop.roiMetrics && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center bg-blue-50 rounded-lg p-2">
                      <div className="text-sm font-semibold text-blue-700">{workshop.roiMetrics.timeToValue}</div>
                      <div className="text-xs text-blue-600">Time to Value</div>
                    </div>
                    <div className="text-center bg-green-50 rounded-lg p-2">
                      <div className="text-sm font-semibold text-green-700">{workshop.roiMetrics.productivityGain}</div>
                      <div className="text-xs text-green-600">Productivity Gain</div>
                    </div>
                    <div className="text-center bg-purple-50 rounded-lg p-2">
                      <div className="text-sm font-semibold text-purple-700">{workshop.roiMetrics.toolAdoption}</div>
                      <div className="text-xs text-purple-600">Tool Adoption</div>
                    </div>
                  </div>
                )}

                <div className="mb-4 text-sm text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>Prerequisites: {workshop.prerequisites}</span>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedWorkshop === workshop.id && (
                  <div className="border-t border-neutral-200 pt-4 mt-4">
                    <h4 className="font-semibold text-neutral-900 mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Workshop Outline
                    </h4>
                    <ul className="space-y-2 mb-4">
                      {workshop.outline.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-neutral-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {workshop.outcome && (
                      <div className="bg-primary-50 rounded-lg p-3 mb-4">
                        <h5 className="font-medium text-primary-900 mb-1">Expected Outcome</h5>
                        <p className="text-primary-700 text-sm">{workshop.outcome}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      const newState = expandedWorkshop === workshop.id ? null : workshop.id;
                      setExpandedWorkshop(newState);
                      if (newState === workshop.id) {
                        track.workshopDetailsViewed(workshop.id, workshop.title, workshop.level);
                      }
                    }}
                    className="bg-white hover:bg-neutral-50 text-primary-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-primary-200 hover:border-primary-300 shadow-md hover:shadow-lg flex-1"
                  >
                    {expandedWorkshop === workshop.id ? 'Show Less' : 'View Details'}
                  </button>
                  <button 
                    onClick={() => track.consultationRequested('workshop-details')}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-transparent"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-600 mb-2">No workshops found</h3>
            <p className="text-neutral-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Team?</h3>
          <p className="text-lg mb-6 text-white/90">
            Get a personalized training plan and instant quote based on your team's needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetQuote}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Get Free Skills Assessment
            </button>
            <button
              onClick={handleBookCall}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Discovery Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWorkshops; 