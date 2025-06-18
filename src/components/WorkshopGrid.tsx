import React from 'react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

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
    color: "green"
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
    color: "green"
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
    color: "green"
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
    color: "yellow"
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
    color: "yellow"
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
    color: "yellow"
  },
  {
    id: 7,
    title: "PromptOps: Reusable Prompt Libraries and Debugging LLMs",
    description: "Prompt chaining, evaluation tools (LM Studio, Flowise, Guidance), and managing prompt versions in Git for teams building LLM-powered products.",
    duration: "4 hours",
    level: "intermediate",
    prerequisites: "Experience with LLM products",
    audience: "Teams building LLM products",
    category: "Vibe-to-Engineer",
    color: "yellow"
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
    color: "blue"
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
    color: "blue"
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
    color: "blue"
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
    color: "red"
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
    color: "red"
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
    color: "red"
  }
];

const getLevelColor = (level: string) => {
  const colors = {
    beginner: 'bg-green-50 text-green-700 border-green-200',
    intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    advanced: 'bg-blue-50 text-blue-700 border-blue-200',
    expert: 'bg-red-50 text-red-700 border-red-200'
  };
  return colors[level as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
};

const getCategoryColor = (color: string) => {
  const colors = {
    green: 'border-l-green-200',
    yellow: 'border-l-yellow-200',
    blue: 'border-l-blue-200',
    red: 'border-l-red-200'
  };
  return colors[color as keyof typeof colors] || 'border-l-gray-200';
};

const WorkshopGrid = () => {
  const [, setSelectedWorkshop] = React.useState<Workshop | null>(null);

  const categories = [
    { name: "Zero-to-One", description: "Onboarding New Coders + Vibe Coders", emoji: "🟢" },
    { name: "Vibe-to-Engineer", description: "Professionalising Your AI-Assisted Coding", emoji: "🟡" },
    { name: "AI-Enhanced Engineering", description: "Software Engineering Best Practices", emoji: "🔵" },
    { name: "AI for Data & ML", description: "AI for Data & ML Engineers", emoji: "🔴" }
  ];

  const handleLearnMore = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    // In a real app, this would navigate to a detailed workshop page
    alert(`🚀 Workshop: ${workshop.title}\n\n📋 Prerequisites: ${workshop.prerequisites}\n\n👥 Target Audience: ${workshop.audience}\n\n⏱️ Duration: ${workshop.duration}\n\n📞 Contact us to enroll in this workshop!`);
  };

  return (
    <section id="workshops" className="py-20 bg-gray-50">
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
                {categoryWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className={`card p-6 ${getCategoryColor(workshop.color)} border-l-4 cursor-pointer`}
                    onClick={() => handleLearnMore(workshop)}
                  >
                    {/* Workshop Header */}
                    <div className="flex items-start justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(workshop.level)}`}>
                        {workshop.level}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {workshop.duration}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-snug">
                      {workshop.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {workshop.description}
                    </p>

                    {/* CTA Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(workshop);
                      }}
                      className="w-full flex items-center justify-center space-x-2 text-pink-600 hover:text-pink-700 font-medium text-sm py-2 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkshopGrid; 