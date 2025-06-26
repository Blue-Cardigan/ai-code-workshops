import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, BookOpen, Target } from 'lucide-react';

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
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    outcome: "Hello World AI app deployed live"
  },
  {
    id: 2,
    title: "Prompt Engineering for Power Users",
    description: "Tool-agnostic prompting skills using Claude, ChatGPT, Gemini. Chain-of-thought prompting and role-based personas for maximum AI productivity.",
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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const AllWorkshops = ({ onBackToHome, targetWorkshopId }: AllWorkshopsProps) => {
  const [searchTerm] = useState('');
  const [selectedLevel] = useState<string>('all');
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
    <div className="min-h-screen bg-neutral-50">
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
            <p className="text-sm text-white/70 italic">
              • All workshops last half a day
            </p>
          </div>

          {/* Categories Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                  selectedCategory === category.name
                    ? 'bg-white border-primary-300 shadow-md ring-2 ring-primary-200'
                    : 'bg-neutral-50 border-neutral-200 hover:bg-white hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 ${category.color} rounded-full mr-2`} />
                  <h3 className="font-semibold text-neutral-900">{category.name}</h3>
                </div>
                <p className="text-sm text-neutral-600">{category.description}</p>
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
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(workshop.level)}`}>
                    {workshop.level}
                  </span>
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
                    className="bg-white hover:bg-neutral-50 text-primary-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 border border-primary-200 hover:border-primary-300 shadow-md hover:shadow-lg flex-1"
                  >
                    {expandedWorkshop === workshop.id ? 'Show Less' : 'View Details'}
                  </button>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl border border-transparent">
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