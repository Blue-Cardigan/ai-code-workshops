import { Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import Button from './Button';

interface Workshop {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  prerequisites: string;
  audience: string;
  category: string;
  color: string;
  anchor: string; // For linking to brochure sections
}

interface WorkshopGridProps {
  onNavigateToBrochure?: (anchor?: string) => void;
}

const workshops: Workshop[] = [
  // Zero-to-One: Onboarding New Coders
  {
    id: 1,
    title: "Intro to Vibe Coding: Build & Deploy Your First AI App",
    description: "Use Lovable + Cursor to scaffold and deploy a simple app with AI-assisted code generation. Learn prompt→code→debug loop, GitHub basics, and deploy via Vercel.",
    duration: "4 hours",
    level: "beginner",
    prerequisites: "No prerequisites",
    audience: "Newbies, functional experts, innovation teams",
    category: "Zero-to-One",
    color: "green",
    anchor: "intro-to-vibe-coding-build--deploy-your-first-ai-app"
  },
  {
    id: 2,
    title: "Prompt Engineering for Power Users",
    description: "Tool-agnostic prompting skills using Claude, ChatGPT, Gemini etc. Includes chain-of-thought prompting, role-based personas, and structured output.",
    duration: "4 hours",
    level: "beginner",
    prerequisites: "No coding experience needed",
    audience: "Non-coders, analysts, professionals",
    category: "Zero-to-One",
    color: "green",
    anchor: "prompt-engineering-for-power-users"
  },
  {
    id: 3,
    title: "Git & GitHub for Beginners (w/ AI Helpers)",
    description: "Version control using Cursor or GitHub Copilot with integrated commit assistance and pre-commit hooks. Includes merge conflicts, branches, and AI-generated commit messages.",
    duration: "4 hours",
    level: "beginner",
    prerequisites: "Optional follow-on from workshops 1 or 2",
    audience: "New developers",
    category: "Zero-to-One",
    color: "green",
    anchor: "git--github-for-beginners-w-ai-helpers"
  },
  // Vibe-to-Engineer
  {
    id: 4,
    title: "Refactor Like a Pro: Clean Code with AI Pairing Tools",
    description: "Refactoring principles and LLM copilots like CodeRabbit. Uses real examples and team exercises. Includes DRY, abstraction, linting, commenting.",
    duration: "4 hours",
    level: "intermediate",
    prerequisites: "Some coding comfort (Python/JS)",
    audience: "Product managers, analysts, junior devs",
    category: "Vibe-to-Engineer",
    color: "yellow",
    anchor: "refactor-like-a-pro-clean-code-with-ai-pairing-tools"
  },
  {
    id: 5,
    title: "From Playground to Production: Shipping AI Projects",
    description: "App scaffolding, deployment patterns (Vercel, Streamlit, Hugging Face), and infra-as-code basics. Optional stacks: React+Firebase, Django+GCP, FastAPI+Railway.",
    duration: "4 hours",
    level: "intermediate",
    prerequisites: "Basic Git + coding fluency",
    audience: "Junior developers, product managers",
    category: "Vibe-to-Engineer",
    color: "yellow",
    anchor: "from-playground-to-production-shipping-ai-projects"
  },
  {
    id: 6,
    title: "Testing in the Age of Copilot",
    description: "AI-assisted test generation (unit, integration), test-driven development using Cursor/Copilot. Bonus: Property-based testing with Hypothesis.",
    duration: "4 hours",
    level: "intermediate",
    prerequisites: "Python or JS experience required",
    audience: "Developers",
    category: "Vibe-to-Engineer",
    color: "yellow",
    anchor: "testing-in-the-age-of-copilot"
  },
  // AI-Enhanced Software Engineering
  {
    id: 8,
    title: "Cursor + Claude + GitHub: Full Workflow Mastery",
    description: "End-to-end tour of modern dev using AI-powered IDEs, model-assisted code review, testing, and deployment. Can be tailored for your in-house stack.",
    duration: "4 hours",
    level: "advanced",
    prerequisites: "Development experience",
    audience: "Mid-level devs, data scientists",
    category: "AI-Enhanced Engineering",
    color: "blue",
    anchor: "cursor--claude--github-full-workflow-mastery"
  },
  {
    id: 9,
    title: "CI/CD in a Vibe Coding World",
    description: "Integrate GitHub Actions or other CI tools with AI-powered code pipelines. Includes security, testing, and deployment triggers.",
    duration: "4 hours",
    level: "advanced",
    prerequisites: "Comfort with Git",
    audience: "DevOps engineers, developers",
    category: "AI-Enhanced Engineering",
    color: "blue",
    anchor: "cicd-in-a-vibe-coding-world"
  },
  {
    id: 10,
    title: "Secure by Design: DevSecOps for AI-Era Engineers",
    description: "Secrets management, scanning for vulnerabilities, AI-generated security policies (IAM), and pitfalls of LLM misuse in prod.",
    duration: "4 hours",
    level: "advanced",
    prerequisites: "Deployment familiarity",
    audience: "DevOps engineers, security-focused devs",
    category: "AI-Enhanced Engineering",
    color: "blue",
    anchor: "secure-by-design-devsecops-for-ai-era-engineers"
  },
  // AI for Data & ML Engineers
  {
    id: 11,
    title: "AI-Assisted Notebooks: Coding Faster with GPT in Jupyter/Colab",
    description: "Learn to clean, explore, and visualize data with GPT inside Jupyter. Optional tools: CoCalc, Cursor, Jupyter AI.",
    duration: "4 hours",
    level: "intermediate",
    prerequisites: "Basic data analysis",
    audience: "Data analysts, scientists",
    category: "AI for Data & ML",
    color: "red",
    anchor: "ai-assisted-notebooks-coding-faster-with-gpt-in-jupyter"
  },
  {
    id: 12,
    title: "Fine-Tuning the Vibes: Training and Evaluating LLMs",
    description: "Prompt tuning, LoRA, retrieval-augmented generation, and evaluation. Use tools like Axolotl, Haystack, and Weights & Biases.",
    duration: "4 hours",
    level: "expert",
    prerequisites: "ML background required",
    audience: "ML engineers, researchers",
    category: "AI for Data & ML",
    color: "red",
    anchor: "fine-tuning-the-vibes-training-and-evaluating-llms"
  },
  {
    id: 13,
    title: "AI Debugging: Helping LLMs Help You",
    description: "Inspect, evaluate, and improve AI-generated responses using eval frameworks, telemetry, and thoughtful UX design.",
    duration: "4 hours",
    level: "expert",
    prerequisites: "RAG/pipeline experience",
    audience: "AI engineers, ML engineers",
    category: "AI for Data & ML",
    color: "red",
    anchor: "ai-debugging-helping-llms-help-you"
  }
];

const getCategoryColors = (color: string) => {
  const colors = {
    green: {
      accent: '#ff6f68',
      level: '#22c55e'
    },
    yellow: {
      accent: '#ffc861',
      level: '#f59e0b'
    },
    blue: {
      accent: '#ff6f68',
      level: '#3b82f6'
    },
    red: {
      accent: '#ffc861',
      level: '#ef4444'
    }
  };
  return colors[color as keyof typeof colors] || colors.green;
};

const WorkshopGrid = ({ onNavigateToBrochure }: WorkshopGridProps) => {
  const categories = [
    { name: "Zero-to-One", description: "Onboarding New Coders + Vibe Coders" },
    { name: "Vibe-to-Engineer", description: "Professionalising Your AI-Assisted Coding" },
    { name: "AI-Enhanced Engineering", description: "Software Engineering Best Practices" },
    { name: "AI for Data & ML", description: "AI for Data & ML Engineers" }
  ];
  


  const handleWorkshopClick = (workshop: Workshop) => {
    if (onNavigateToBrochure) {
      onNavigateToBrochure(workshop.anchor);
    }
  };



  return (
    <section id="workshops" className="py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-Enhanced Development Workshops
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured 4-hour workshops with clear notes on prerequisites and target audience. 
            Can be delivered standalone or as part of structured learning tracks.
          </p>
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const categoryWorkshops = workshops.filter(w => w.category === category.name);
          
          return (
            <div key={category.name} className="mb-16">
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>

              {/* Workshop Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryWorkshops.map((workshop) => {
                  const colors = getCategoryColors(workshop.color);
                  
                  return (
                    <div
                      key={workshop.id}
                      className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
                      onClick={() => handleWorkshopClick(workshop)}
                    >
                      {/* Card Header */}
                      <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: colors.level }}
                          >
                            {workshop.level.toUpperCase()}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {workshop.duration}
                          </div>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                          {workshop.title}
                        </h4>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {workshop.description}
                        </p>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Prerequisites</span>
                              <p className="text-sm text-gray-700">{workshop.prerequisites}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Target Audience</span>
                              <p className="text-sm text-gray-700">{workshop.audience}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div 
                        className="px-6 py-3 border-t border-gray-100 group-hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {workshop.category}
                          </span>
                          <ArrowRight 
                            className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" 
                            style={{ color: colors.accent }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
          );
        })}

        {/* CTA Section */}
        <div className="border-t border-gray-200 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to start your AI-powered coding journey?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI to supercharge their coding skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                          <Button className="flex items-center space-x-2">
                <span>Book a workshop</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopGrid; 