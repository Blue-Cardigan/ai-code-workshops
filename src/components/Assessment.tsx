import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Users, Code, Database } from 'lucide-react';
import Button from './Button';

interface AssessmentProps {
  onBackToHome: () => void;
}

interface AssessmentData {
  teamSize: string;
  experience: string;
  tools: string[];
  goals: string[];
  timeCommitment: string;
  deliveryFormat: string;
  background: string;
}

const Assessment = ({ onBackToHome }: AssessmentProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    teamSize: '',
    experience: '',
    tools: [],
    goals: [],
    timeCommitment: '',
    deliveryFormat: '',
    background: ''
  });
  const [showResults, setShowResults] = useState(false);

  const totalSteps = 7;

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
    const { teamSize, experience, goals, background, timeCommitment, deliveryFormat } = assessmentData;
    
    // Team Foundations Track - for teams with no/basic coding experience
    if (experience === 'none' || experience === 'basic') {
      return {
        track: 'Team Foundations Track',
        icon: <Users className="h-8 w-8" />,
        description: 'For teams new to coding, unlikely to be heavy users of code. Perfect for product managers, business analysts, or innovation team members.',
        workshops: [
          'Intro to Vibe Coding: Build & Deploy Your First AI App',
          'Prompt Engineering for Power Users',
          'Git & GitHub for Beginners (w/ AI Helpers)'
        ],
        reason: `Based on your team's limited coding experience, this track will provide foundational skills to understand AI-assisted development capabilities and opportunities for automation. With ${teamSize === 'large' ? 'a large team' : teamSize === 'medium' ? 'a medium-sized team' : 'a small team'}, we recommend ${deliveryFormat === 'on-site' ? 'on-site workshops' : deliveryFormat === 'virtual' ? 'virtual sessions' : 'a flexible delivery format'} to ensure everyone learns together.`,
        format: deliveryFormat === 'on-site' ? 'On-site team workshops' : deliveryFormat === 'virtual' ? 'Virtual team sessions' : 'Flexible delivery options'
      };
    }
    
    // ML Engineer to AI Dev Track - for data/ML teams
    if (background === 'data' || goals.includes('ml-ai')) {
      return {
        track: 'ML Engineer to AI Dev Track',
        icon: <Database className="h-8 w-8" />,
        description: 'Specialized workshops for data science and machine learning professionals transitioning to AI development.',
        workshops: [
          'AI-Assisted Notebooks: Coding Faster with GPT in Jupyter/Colab',
          'Fine-Tuning the Vibes: Training and Evaluating LLMs',
          'AI Debugging: Helping LLMs Help You'
        ],
        reason: `Your team's background in data/ML makes this specialized track ideal for advancing to modern AI development practices. The ${timeCommitment} commitment works well for ${teamSize === 'small' ? 'focused small group learning' : 'comprehensive team training'} with hands-on ML/AI engineering.`,
        format: deliveryFormat === 'on-site' ? 'Intensive on-site workshops' : deliveryFormat === 'virtual' ? 'Interactive virtual labs' : 'Hybrid learning approach'
      };
    }
    
    // AI-Augmented Engineer Track - for teams with some coding experience
    return {
      track: 'AI-Augmented Engineer Track',
      icon: <Code className="h-8 w-8" />,
      description: 'For teams with coding comfort looking to integrate AI tools into professional workflows and build production-ready applications.',
      workshops: [
        'Refactor Like a Pro: Clean Code with AI Pairing Tools',
        'From Playground to Production: Shipping AI Projects',
        'Testing in the Age of Copilot',
        'Cursor + Claude + GitHub: Full Workflow Mastery',
        'CI/CD in a Vibe Coding World'
      ],
      reason: `Perfect for teams with ${experience === 'intermediate' ? 'intermediate' : experience === 'advanced' ? 'advanced' : 'mixed'} coding experience. This track provides professional AI-assisted development practices and production deployment skills. The ${timeCommitment} schedule and ${deliveryFormat} format will work well for your ${teamSize === 'large' ? 'large' : teamSize === 'medium' ? 'medium' : 'small'} team.`,
      format: deliveryFormat === 'on-site' ? 'Collaborative on-site sessions' : deliveryFormat === 'virtual' ? 'Virtual team workshops' : 'Flexible team training'
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
      case 1: return assessmentData.teamSize !== '';
      case 2: return assessmentData.experience !== '';
      case 3: return assessmentData.tools.length > 0;
      case 4: return assessmentData.goals.length > 0;
      case 5: return assessmentData.timeCommitment !== '';
      case 6: return assessmentData.deliveryFormat !== '';
      case 7: return assessmentData.background !== '';
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
              Team Assessment Complete!
            </h2>
            <p className="text-xl text-gray-600">
              Based on your team's needs, we recommend the following training approach:
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

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Recommended Format:</h4>
              <p className="text-gray-600">
                {'format' in recommendation ? recommendation.format : 'Standard workshop format'}
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
                <span>Schedule Team Training</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" onClick={onBackToHome}>
                Explore All Workshops
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Your Team Assessment Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Team Size:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.teamSize}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Experience Level:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.experience}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Time Commitment:</span>
                <span className="ml-2 text-gray-600">{assessmentData.timeCommitment}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Delivery Format:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.deliveryFormat}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Background:</span>
                <span className="ml-2 text-gray-600 capitalize">{assessmentData.background}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Goals:</span>
                <span className="ml-2 text-gray-600">{assessmentData.goals.join(', ')}</span>
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
              What's the size of your team?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us recommend the right training approach and format for your team.
            </p>
            <div className="space-y-3">
              {[
                { value: 'individual', label: '1-2 people', desc: 'Individual or pair training' },
                { value: 'small', label: '3-8 people', desc: 'Small team workshop' },
                { value: 'medium', label: '9-20 people', desc: 'Medium team training session' },
                { value: 'large', label: '20+ people', desc: 'Large group or department-wide training' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSingleSelect('teamSize', option.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.teamSize === option.value
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
              What's your team's current coding experience level?
            </h2>
            <p className="text-gray-600 mb-8">
              Select the level that best describes the majority of your team members.
            </p>
            <div className="space-y-3">
              {[
                { value: 'none', label: 'No coding experience', desc: 'Most team members have never written code before' },
                { value: 'basic', label: 'Basic (0-1 years)', desc: 'Team has done some tutorials or simple projects' },
                { value: 'intermediate', label: 'Intermediate (1-3 years)', desc: 'Team can build applications with guidance' },
                { value: 'advanced', label: 'Advanced (3+ years)', desc: 'Team is comfortable with multiple languages and frameworks' },
                { value: 'mixed', label: 'Mixed experience levels', desc: 'Team has a variety of experience levels' }
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

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Which tools does your team currently use?
            </h2>
            <p className="text-gray-600 mb-8">
              Select all that apply. This helps us tailor the content to your team's existing workflow.
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

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What are your team's learning goals?
            </h2>
            <p className="text-gray-600 mb-8">
              Select all that apply. What would you like your team to achieve?
            </p>
            <div className="space-y-3">
              {[
                { value: 'upskill', label: 'Upskill team for current roles', desc: 'Improve coding abilities for existing positions' },
                { value: 'ai-tools', label: 'Learn AI-assisted coding', desc: 'Master tools like Copilot, Cursor, and ChatGPT for coding' },
                { value: 'ml-ai', label: 'Build ML/AI applications', desc: 'Create machine learning and AI-powered applications' },
                { value: 'production', label: 'Ship production applications', desc: 'Build and deploy professional-grade applications' },
                { value: 'automation', label: 'Automate workflows', desc: 'Use code to automate repetitive business tasks' },
                { value: 'innovation', label: 'Drive innovation', desc: 'Enable team to build new products and features' }
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

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How much time can your team commit to training?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us recommend the right pace and format for your team's training.
            </p>
            <div className="space-y-3">
              {[
                { value: '2-4 hours/week', label: '2-4 hours per week', desc: 'Light commitment, spread over time' },
                { value: '5-10 hours/week', label: '5-10 hours per week', desc: 'Moderate commitment, steady progress' },
                { value: '1-2 days intensive', label: '1-2 day intensive workshop', desc: 'Concentrated learning in a short period' },
                { value: '3-5 days intensive', label: '3-5 day intensive bootcamp', desc: 'Immersive training experience' }
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

      case 6:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What's your preferred training delivery format?
            </h2>
            <p className="text-gray-600 mb-8">
              Understanding your team's preferred learning approach helps us customize the experience.
            </p>
            <div className="space-y-3">
              {[
                { value: 'on-site', label: 'On-site workshops', desc: 'In-person training at your location' },
                { value: 'virtual', label: 'Virtual workshops', desc: 'Live online training sessions' },
                { value: 'hybrid', label: 'Hybrid approach', desc: 'Combination of in-person and virtual' },
                { value: 'self-paced', label: 'Self-paced online', desc: 'Team learns at their own pace with materials' },
                { value: 'mentoring', label: 'One-on-one mentoring', desc: 'Individual coaching for team members' }
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() => handleSingleSelect('deliveryFormat', format.value)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    assessmentData.deliveryFormat === format.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-gray-900">{format.label}</div>
                  <div className="text-sm text-gray-600">{format.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What's your team's professional background?
            </h2>
            <p className="text-gray-600 mb-8">
              This helps us understand your team's context and recommend relevant applications.
            </p>
            <div className="space-y-3">
              {[
                { value: 'tech', label: 'Technology/Software', desc: 'Team already works in tech or software development' },
                { value: 'data', label: 'Data/Analytics/Research', desc: 'Team works with data, research, or analytics' },
                { value: 'business', label: 'Business/Finance/Consulting', desc: 'Business operations, finance, or consulting team' },
                { value: 'creative', label: 'Creative/Design/Marketing', desc: 'Creative fields, design, or marketing team' },
                { value: 'operations', label: 'Operations/Manufacturing', desc: 'Operations, manufacturing, or process-focused team' },
                { value: 'mixed', label: 'Mixed backgrounds', desc: 'Team has diverse professional backgrounds' }
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