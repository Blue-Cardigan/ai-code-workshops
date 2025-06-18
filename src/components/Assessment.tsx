import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Users, Code, Database } from 'lucide-react';
import Button from './Button';

interface AssessmentProps {
  onBackToHome: () => void;
}

interface AssessmentData {
  experience: string;
  tools: string[];
  goals: string[];
  timeCommitment: string;
  learningStyle: string;
  background: string;
}

const Assessment = ({ onBackToHome }: AssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    experience: '',
    tools: [],
    goals: [],
    timeCommitment: '',
    learningStyle: '',
    background: ''
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 6;

  const handleMultiSelect = (field: keyof AssessmentData, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleSingleSelect = (field: keyof AssessmentData, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRecommendation = () => {
    const { experience, goals, background } = assessmentData;
    
    if (experience === 'none' || experience === 'basic') {
      return {
        track: 'New to Coding Track',
        icon: <Users className="h-8 w-8" />,
        description: 'Perfect for complete beginners and those new to programming',
        workshops: [
          'Intro to Vibe Coding: Build & Deploy Your First AI App',
          'Prompt Engineering for Power Users',
          'Git & GitHub for Beginners (w/ AI Helpers)'
        ],
        reason: 'Based on your limited coding experience, this track will give you a solid foundation in AI-assisted development.'
      };
    }
    
    if (background === 'data' || goals.includes('ml-ai')) {
      return {
        track: 'ML Engineer to AI Dev Track',
        icon: <Database className="h-8 w-8" />,
        description: 'Transition from traditional ML to modern AI development practices',
        workshops: [
          'AI-Assisted Notebooks: Coding Faster with GPT in Jupyter/Colab',
          'Fine-Tuning the Vibes: Training and Evaluating LLMs',
          'AI Debugging: Helping LLMs Help You'
        ],
        reason: 'Your background in data/ML makes you perfect for this specialized track focusing on AI development.'
      };
    }
    
    return {
      track: 'AI-Augmented Engineer Track',
      icon: <Code className="h-8 w-8" />,
      description: 'Level up your development skills with AI-powered tools and workflows',
      workshops: [
        'Refactor Like a Pro: Clean Code with AI Pairing Tools',
        'Testing in the Age of Copilot',
        'Cursor + Claude + GitHub: Full Workflow Mastery',
        'CI/CD in a Vibe Coding World'
      ],
      reason: 'Your development experience combined with your goals makes this track ideal for advancing your AI-assisted coding skills.'
    };
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return assessmentData.experience !== '';
      case 2: return assessmentData.tools.length > 0;
      case 3: return assessmentData.goals.length > 0;
      case 4: return assessmentData.timeCommitment !== '';
      case 5: return assessmentData.learningStyle !== '';
      case 6: return assessmentData.background !== '';
      default: return false;
    }
  };

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Assessment Results</h1>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Assessment Complete!
            </h2>
            <p className="text-xl text-gray-600">
              Based on your responses, we recommend the following learning track:
            </p>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg flex-shrink-0" style={{ backgroundColor: '#fcf7f7' }}>
                {recommendation.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {recommendation.track}
                </h3>
                <p className="text-gray-600 text-lg">
                  {recommendation.description}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Why this track?</h4>
              <p className="text-gray-600">
                {recommendation.reason}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Included Workshops:</h4>
              <div className="grid grid-cols-1 gap-3">
                {recommendation.workshops.map((workshop, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#ff6f68' }}></div>
                    <span className="text-gray-700">{workshop}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center space-x-2">
                <span>Enroll in Track</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={onBackToHome}>
                Explore All Workshops
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Your Assessment Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Experience Level:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.experience}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Time Commitment:</span>
                <span className="ml-2 text-gray-600">{assessmentData.timeCommitment}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Learning Style:</span>
                <span className="ml-2 text-gray-600">{assessmentData.learningStyle}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Background:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.background}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What's your current coding experience level?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us understand where to start your learning journey.
            </p>
            <div className="space-y-3">
              {[
                { value: 'none', label: 'No coding experience', desc: 'I\'ve never written code before' },
                { value: 'basic', label: 'Basic (0-1 years)', desc: 'I\'ve done some tutorials or simple projects' },
                { value: 'intermediate', label: 'Intermediate (1-3 years)', desc: 'I can build applications with guidance' },
                { value: 'advanced', label: 'Advanced (3+ years)', desc: 'I\'m comfortable with multiple languages and frameworks' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('experience', option.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.experience === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Which tools do you currently use?
            </h2>
            <p className="text-gray-600 mb-8">
              Select all that apply. This helps us tailor the content to your workflow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'VS Code', 'GitHub', 'ChatGPT', 'Claude', 'Cursor', 'GitHub Copilot',
                'Jupyter Notebooks', 'Python', 'JavaScript', 'React', 'Node.js', 'None of the above'
              ].map((tool) => (
                <button
                  key={tool}
                  onClick={() => handleMultiSelect('tools', tool)}
                  className={`text-left p-3 border rounded-lg transition-colors ${
                    assessmentData.tools.includes(tool)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What are your learning goals?
            </h2>
            <p className="text-gray-600 mb-8">
              Select all that apply. What would you like to achieve?
            </p>
            <div className="space-y-3">
              {[
                { value: 'career-change', label: 'Career change to tech', desc: 'I want to transition into a tech role' },
                { value: 'upskill', label: 'Upskill at current job', desc: 'Improve my coding abilities for my current position' },
                { value: 'ai-tools', label: 'Learn AI-assisted coding', desc: 'Master tools like Copilot, Cursor, and ChatGPT for coding' },
                { value: 'ml-ai', label: 'Build ML/AI applications', desc: 'Create machine learning and AI-powered applications' },
                { value: 'automation', label: 'Automate workflows', desc: 'Use code to automate repetitive tasks' },
                { value: 'side-projects', label: 'Build side projects', desc: 'Create personal projects and applications' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => handleMultiSelect('goals', goal.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.goals.includes(goal.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{goal.label}</div>
                  <div className="text-sm text-gray-600">{goal.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How much time can you commit to learning?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us recommend the right pace for your learning journey.
            </p>
            <div className="space-y-3">
              {[
                { value: '2-4 hours/week', label: '2-4 hours per week', desc: 'Light commitment, steady progress' },
                { value: '5-10 hours/week', label: '5-10 hours per week', desc: 'Moderate commitment, good progress' },
                { value: '10-20 hours/week', label: '10-20 hours per week', desc: 'High commitment, fast progress' },
                { value: 'Intensive', label: 'Full-time intensive', desc: 'Maximum commitment, rapid skill development' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('timeCommitment', option.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.timeCommitment === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What's your preferred learning style?
            </h2>
            <p className="text-gray-600 mb-8">
              Understanding how you learn best helps us customize your experience.
            </p>
            <div className="space-y-3">
              {[
                { value: 'hands-on', label: 'Hands-on coding', desc: 'I learn best by building projects and writing code' },
                { value: 'structured', label: 'Structured lessons', desc: 'I prefer step-by-step guided instruction' },
                { value: 'video', label: 'Video tutorials', desc: 'I learn well from watching demonstrations' },
                { value: 'reading', label: 'Reading and documentation', desc: 'I like to read through materials and documentation' },
                { value: 'collaborative', label: 'Collaborative learning', desc: 'I learn better in groups or with mentorship' }
              ].map((style) => (
                <button
                  key={style.value}
                  onClick={() => handleSingleSelect('learningStyle', style.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.learningStyle === style.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{style.label}</div>
                  <div className="text-sm text-gray-600">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What's your professional background?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us understand your context and recommend relevant applications.
            </p>
            <div className="space-y-3">
              {[
                { value: 'tech', label: 'Technology/Software', desc: 'Already working in tech or software development' },
                { value: 'data', label: 'Data/Analytics/Research', desc: 'Working with data, research, or analytics' },
                { value: 'business', label: 'Business/Finance/Consulting', desc: 'Business operations, finance, or consulting' },
                { value: 'creative', label: 'Creative/Design/Marketing', desc: 'Creative fields, design, or marketing' },
                { value: 'education', label: 'Education/Training', desc: 'Teaching, training, or educational roles' },
                { value: 'other', label: 'Other/Student', desc: 'Different field or currently a student' }
              ].map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => handleSingleSelect('background', bg.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.background === bg.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{bg.label}</div>
                  <div className="text-sm text-gray-600">{bg.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBackToHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i + 1 <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-1">
        <div 
          className="bg-blue-500 h-1 transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {renderStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === totalSteps ? 'Get Results' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment; 