import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Star, Filter, Search, BookOpen, Target } from 'lucide-react';

interface Workshop {
  id: number;
  title: string;
  description: string;
  outline: string[];
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  prerequisites: string;
  students: number;
  rating: number;
  image: string;
  outcome?: string;
}

interface AllWorkshopsProps {
  onBackToHome: () => void;
  targetWorkshopId?: number;
}

const allWorkshops: Workshop[] = [
  // Zero-to-One: Onboarding New Coders + Vibe Coders
  {
    id: 1,
    title: "Intro to Vibe Coding: Build & Deploy Your First AI App",
    description: "Use Lovable + Cursor to scaffold and deploy a simple app with AI-assisted code generation. Perfect for beginners who want to start their AI development journey.",
    outline: [
      "Use Lovable + Cursor to scaffold and deploy a simple app with AI-assisted code generation",
      "Learn prompt→code→debug loop and version control basics",
      "GitHub fundamentals and deployment via Vercel",
      "Understanding AI coding assistants and their capabilities",
      "Building confidence in technology experimentation"
    ],
    duration: "4 hours",
    level: "beginner",
    category: "Zero-to-One",
    prerequisites: "None",
    students: 250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    outcome: "First app deployed live"
  },
  {
    id: 2,
    title: "Prompt Engineering for Power Users",
    description: "Tool-agnostic prompting skills using Claude, ChatGPT, Gemini etc. Master advanced prompting techniques for maximum AI productivity.",
    outline: [
      "Tool-agnostic prompting skills using Claude, ChatGPT, Gemini",
      "Chain-of-thought prompting and role-based personas",
      "Structured output generation and prompt optimization",
      "Context management and conversation strategies",
      "Optional add-on tracks for legal, HR, finance, product applications"
    ],
    duration: "4 hours",
    level: "beginner",
    category: "Zero-to-One",
    prerequisites: "No coding experience needed",
    students: 180,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Git & GitHub for Beginners (w/ AI Helpers)",
    description: "Version control fundamentals using AI-assisted tools. Learn collaborative development with intelligent commit assistance.",
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
    students: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // Vibe-to-Engineer: Professionalising Your AI-Assisted Coding
  {
    id: 4,
    title: "Refactor Like a Pro: Clean Code with AI Pairing Tools",
    description: "Master refactoring principles with LLM copilots like CodeRabbit. Learn DRY principles, abstraction, and professional code quality standards.",
    outline: [
      "Refactoring principles with LLM copilots like CodeRabbit",
      "DRY principles, abstraction, and code organization",
      "Automated linting, commenting, and documentation",
      "Real examples and team collaboration exercises",
      "Code review processes with AI assistance"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Some coding comfort assumed (Python/JS)",
    students: 180,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "From Playground to Production: Shipping AI Projects",
    description: "Learn to deploy AI applications professionally with proper infrastructure, monitoring, and best practices for production environments.",
    outline: [
      "App scaffolding and project structure best practices",
      "Deployment patterns: Vercel, Streamlit, Hugging Face",
      "Infrastructure-as-code basics and environment management",
      "Optional stacks: React+Firebase, Django+GCP, or FastAPI+Railway",
      "Monitoring and maintenance of AI-powered applications"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Basic Git + coding fluency required",
    students: 160,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    students: 140,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "PromptOps: Reusable Prompt Libraries and Debugging LLMs",
    description: "Advanced prompt management and LLM debugging techniques for teams building production AI systems.",
    outline: [
      "Prompt chaining and evaluation tools (LM Studio, Flowise, Guidance)",
      "Managing prompt versions in Git for teams",
      "Building reusable prompt libraries",
      "Debugging and optimizing LLM responses",
      "Production prompt monitoring and analytics"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "Vibe-to-Engineer",
    prerequisites: "Experience with LLM products",
    students: 95,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // AI-Enhanced Software Engineering Best Practices
  {
    id: 8,
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
    category: "AI-Enhanced Engineering",
    prerequisites: "For developers looking to level up",
    students: 320,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
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
    category: "AI-Enhanced Engineering",
    prerequisites: "Comfort with Git required",
    students: 185,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
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
    category: "AI-Enhanced Engineering",
    prerequisites: "Deployment familiarity required",
    students: 125,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // AI for Data & ML Engineers
  {
    id: 11,
    title: "AI-Assisted Notebooks: Coding Faster with GPT in Jupyter",
    description: "Accelerate data analysis and visualization with AI assistance directly in Jupyter notebooks. Perfect introduction for data professionals.",
    outline: [
      "Clean, explore, and visualize data with GPT integration",
      "Jupyter AI extensions and productivity enhancements",
      "Optional tools: CoCalc, Cursor, advanced notebook environments",
      "Automated data analysis and insight generation",
      "Documentation and reproducibility best practices"
    ],
    duration: "4 hours",
    level: "intermediate",
    category: "AI for Data & ML",
    prerequisites: "Great intro for data analysts or scientists",
    students: 210,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
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
    category: "AI for Data & ML",
    prerequisites: "ML background required",
    students: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    title: "AI Debugging: Helping LLMs Help You",
    description: "Master the art of debugging AI systems, improving response quality, and building robust AI-powered applications.",
    outline: [
      "Inspecting and evaluating AI-generated responses",
      "Evaluation frameworks and automated testing",
      "Telemetry and observability for AI systems",
      "Thoughtful UX design for AI-powered applications",
      "Troubleshooting common AI integration issues"
    ],
    duration: "4 hours",
    level: "expert",
    category: "AI for Data & ML",
    prerequisites: "For anyone working with RAG/AI pipelines",
    students: 75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const AllWorkshops = ({ onBackToHome, targetWorkshopId }: AllWorkshopsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(targetWorkshopId || null);

  // Scroll to target workshop when component mounts
  useEffect(() => {
    if (targetWorkshopId) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`workshop-${targetWorkshopId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [targetWorkshopId]);

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
    { name: "Zero-to-One", description: "Onboarding New Coders + Vibe Coders", color: "bg-green-500" },
    { name: "Vibe-to-Engineer", description: "Professionalising Your AI-Assisted Coding", color: "bg-yellow-500" },
    { name: "AI-Enhanced Engineering", description: "Software Engineering Best Practices", color: "bg-blue-500" },
    { name: "AI for Data & ML", description: "AI for Data & ML Engineers", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-16">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={onBackToHome}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">All Workshops</h1>
            <p className="text-xl text-neutral-600 max-w-3xl">
              Complete catalog of our AI development training programs. From absolute beginners to expert-level practitioners.
            </p>
          </div>

          {/* Categories Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 ${category.color} rounded-full mr-2`} />
                  <h3 className="font-semibold text-neutral-900">{category.name}</h3>
                </div>
                <p className="text-sm text-neutral-600">{category.description}</p>
              </div>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search workshops..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4">
              <select
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              
              <select
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Zero-to-One">Zero-to-One</option>
                <option value="Vibe-to-Engineer">Vibe-to-Engineer</option>
                <option value="AI-Enhanced Engineering">AI-Enhanced Engineering</option>
                <option value="AI for Data & ML">AI for Data & ML</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Workshop Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} id={`workshop-${workshop.id}`} className="card">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(workshop.level)}`}>
                    {workshop.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-neutral-900 flex-1 pr-4">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-neutral-600">{workshop.rating}</span>
                  </div>
                </div>

                <p className="text-neutral-600 mb-4">
                  {workshop.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-neutral-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{workshop.students} students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span className="truncate">{workshop.prerequisites}</span>
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
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
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
                    onClick={() => setExpandedWorkshop(expandedWorkshop === workshop.id ? null : workshop.id)}
                    className="btn-secondary flex-1"
                  >
                    {expandedWorkshop === workshop.id ? 'Show Less' : 'View Details'}
                  </button>
                  <button className="btn-primary">
                    Enroll Now
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
      </div>
    </div>
  );
};

export default AllWorkshops; 