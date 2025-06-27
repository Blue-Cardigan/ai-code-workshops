import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Database, Users, Target, Clock, Lightbulb, Mail, Phone, Building, DollarSign } from 'lucide-react';
import Button from './Button';
import { supabase, type AssessmentSubmission } from '../lib/supabase';
import { track } from '../lib/analytics';

interface AssessmentProps {
  onBackToHome: () => void;
}

interface Question {
  id: number;
  title: string;
  type: 'single' | 'multiple' | 'text' | 'contact';
  options?: {
    id: string;
    text: string;
    value: number;
    track?: 'beginner' | 'engineer' | 'ml' | 'any';
  }[];
  conditional?: {
    dependsOn: number;
    showWhen: string | string[];
  };
}

interface AssessmentResult {
  track: 'beginner' | 'engineer' | 'ml';
  title: string;
  description: string;
  workshops: string[];
  icon: React.ReactNode;
  color: string;
  pricing: {
    basePrice: number; // Price for up to 8 people
    additionalPerPerson: number; // Additional cost per person beyond 8
  };
}

const questions: Question[] = [
  {
    id: 1,
    title: "How many employees are in your company?",
    type: 'single',
    options: [
      { id: '1-10', text: '1-10 employees', value: 0, track: 'any' },
      { id: '11-50', text: '11-50 employees', value: 1, track: 'any' },
      { id: '51-200', text: '51-200 employees', value: 2, track: 'any' },
      { id: '201+', text: '201+ employees', value: 3, track: 'any' }
    ]
  },
  {
    id: 2,
    title: "What are you most interested in?",
    type: 'single',
    options: [
      { id: 'non-tech-coding', text: 'Enabling non-technical people to code', value: 0, track: 'beginner' },
      { id: 'junior-skills', text: 'Upgrading junior developer skills', value: 1, track: 'engineer' },
      { id: 'senior-skills', text: 'Enhancing senior engineer capabilities', value: 2, track: 'engineer' },
      { id: 'tool-implementation', text: 'Identifying and implementing best AI tools', value: 3, track: 'any' }
    ]
  },
  {
    id: 3,
    title: "Which roles will be taking this training?",
    type: 'multiple',
    options: [
      { id: 'product', text: 'Product/Project Managers', value: 0, track: 'beginner' },
      { id: 'junior-devs', text: 'Junior Developers', value: 1, track: 'engineer' },
      { id: 'senior-devs', text: 'Senior Developers', value: 2, track: 'engineer' },
      { id: 'data-team', text: 'Data Scientists/ML Engineers', value: 3, track: 'ml' },
      { id: 'leadership', text: 'Technical Leadership', value: 4, track: 'beginner' }
    ]
  },
  {
    id: 4,
    title: "Do you prefer in-person or remote training?",
    type: 'single',
    options: [
      { id: 'in-person', text: 'In-person training', value: 0 },
      { id: 'remote', text: 'Remote/virtual training', value: 1 },
      { id: 'hybrid', text: 'Hybrid approach', value: 2 }
    ]
  },
  {
    id: 5,
    title: "For in-person training, would you prefer:",
    type: 'single',
    conditional: {
      dependsOn: 4,
      showWhen: ['in-person', 'hybrid']
    },
    options: [
      { id: 'in-office', text: 'Training at your office', value: 0 },
      { id: 'we-host', text: 'We host at our location', value: 1 }
    ]
  },
  {
    id: 6,
    title: "Contact Information",
    type: 'contact'
  }
];

const trackResults: Record<string, AssessmentResult> = {
  beginner: {
    track: 'beginner',
    title: 'New to Coding Track',
    description: 'Perfect for complete beginners and those new to programming. Start your journey into AI-powered development with foundational skills.',
    workshops: ['Intro to Vibe Coding', 'Prompt Engineering for Power Users', 'Git & GitHub for Beginners'],
    icon: <Users className="h-8 w-8" />,
    color: 'green',
    pricing: {
      basePrice: 7200, // £7,200 for up to 8 people
      additionalPerPerson: 900, // £900 per additional person
    }
  },
  engineer: {
    track: 'engineer',
    title: 'AI-Augmented Engineer Track',
    description: 'Level up your development skills with AI-powered tools and workflows. Perfect for developers looking to boost productivity.',
    workshops: ['Refactor Like a Pro', 'Testing in the Age of Copilot', 'From Playground to Production', 'Cursor + Claude + GitHub'],
    icon: <Code className="h-8 w-8" />,
    color: 'blue',
    pricing: {
      basePrice: 10800, // £10,800 for up to 8 people
      additionalPerPerson: 1350, // £1,350 per additional person
    }
  },
  ml: {
    track: 'ml',
    title: 'ML Engineer to AI Dev Track',
    description: 'Transition from traditional ML to modern AI development practices. Bridge the gap between data science and software development.',
    workshops: ['AI-Assisted Notebooks', 'Fine-Tuning the Vibes', 'AI Debugging'],
    icon: <Database className="h-8 w-8" />,
    color: 'red',
    pricing: {
      basePrice: 13200, // £13,200 for up to 8 people
      additionalPerPerson: 1650, // £1,650 per additional person
    }
  }
};

const Assessment: React.FC<AssessmentProps> = ({ onBackToHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [contactInfo, setContactInfo] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    additional_notes: '',
    team_size: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  // Track assessment start
  useEffect(() => {
    if (!hasTrackedStart) {
      track.assessmentStarted();
      setHasTrackedStart(true);
    }
  }, [hasTrackedStart]);

  const handleAnswer = (questionId: number, optionId: string, type: 'single' | 'multiple') => {
    const question = questions.find(q => q.id === questionId);
    
    setAnswers(prev => {
      const newAnswers = type === 'single' 
        ? { ...prev, [questionId]: [optionId] }
        : {
            ...prev, 
            [questionId]: (prev[questionId] || []).includes(optionId)
              ? (prev[questionId] || []).filter(id => id !== optionId)
              : [...(prev[questionId] || []), optionId]
          };

      // Track the answer
      if (question) {
        const answerValue = type === 'single' ? optionId : newAnswers[questionId];
        track.assessmentQuestionAnswered(questionId, answerValue, question.title);
      }

      return newAnswers;
    });
  };

  const calculateResult = async () => {
    const trackScores = { beginner: 0, engineer: 0, ml: 0 };
    
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return;

      selectedOptions.forEach(optionId => {
        const option = question.options?.find(opt => opt.id === optionId);
        if (option?.track) {
          if (option.track === 'any') {
            // Options with 'any' track contribute to all tracks
            trackScores.beginner += option.value;
            trackScores.engineer += option.value;
            trackScores.ml += option.value;
          } else if (option.track in trackScores) {
            trackScores[option.track as keyof typeof trackScores] += option.value;
          }
        }
      });
    });

    // Determine the best track
    const bestTrack = Object.entries(trackScores).reduce((a, b) => 
      trackScores[a[0] as keyof typeof trackScores] > trackScores[b[0] as keyof typeof trackScores] ? a : b
    )[0] as keyof typeof trackResults;

    const recommendedTrack = trackResults[bestTrack];
    
    // Calculate the actual quote value
    const teamSize = parseInt(contactInfo.team_size) || 0;
    const basePrice = recommendedTrack.pricing.basePrice;
    const additionalCost = teamSize > 8 ? (teamSize - 8) * recommendedTrack.pricing.additionalPerPerson : 0;
    const finalQuoteValue = basePrice + additionalCost;
    
    setResult(recommendedTrack);

    // Track assessment completion
    track.assessmentCompleted(bestTrack, questions.length);

    // Track quote generation
    const companySize = answers[1]?.[0] || '';
    track.quoteGenerated(bestTrack, teamSize, finalQuoteValue, companySize);

    // Submit to Supabase
    try {
      setIsSubmitting(true);
      const submission: AssessmentSubmission = {
        company_size: answers[1]?.[0] || '',
        interests: answers[2]?.[0] || '',
        roles: answers[3] || [],
        training_preference: answers[4]?.[0] || '',
        in_person_hosting: answers[5]?.[0] || '',
        company_name: contactInfo.company_name,
        contact_name: contactInfo.contact_name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        additional_notes: contactInfo.additional_notes,
        recommended_track: bestTrack,
        team_size: contactInfo.team_size,
        quote_value: finalQuoteValue
      };

      const { error } = await supabase
        .from('assessment_submissions')
        .insert([submission]);

      if (error) {
        console.error('Error submitting assessment:', error);
      } else {
        // Track successful contact form submission (main conversion)
        track.contactFormSubmitted({
          company_name: contactInfo.company_name,
          contact_name: contactInfo.contact_name,
          email: contactInfo.email,
          team_size: contactInfo.team_size,
          recommended_track: bestTrack,
          quote_value: finalQuoteValue,
        });
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setIsSubmitting(false);
    }

    setShowResult(true);
  };

  const getFilteredQuestions = () => {
    return questions.filter(q => {
      if (!q.conditional) return true;
      const dependentAnswer = answers[q.conditional.dependsOn]?.[0];
      const showWhen = q.conditional.showWhen;
      
      if (Array.isArray(showWhen)) {
        return showWhen.includes(dependentAnswer);
      }
      return dependentAnswer === showWhen;
    });
  };

  const nextQuestion = () => {
    const filteredQuestions = getFilteredQuestions();
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setResult(null);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 text-green-800',
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      red: 'bg-red-50 border-red-200 text-red-800'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete!</h1>
            <p className="text-lg text-gray-600">Here's your personalised learning recommendation</p>
          </div>

          <div className={`p-8 rounded-2xl border-2 ${getColorClasses(result.color)} mb-8`}>
            <div className="flex items-center mb-4">
              <div className={`p-3 bg-white rounded-lg mr-4`}>
                {result.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{result.title}</h2>
                <p className="text-gray-700 mt-2">{result.description}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Workshops:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.workshops.map((workshop, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-800">{workshop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Calculation */}
            {contactInfo.team_size && (
              <div className="mt-6 bg-white p-6 rounded-lg border-2 border-green-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Investment Quote</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Training Duration:</span>
                    <span className="font-medium">Half day (4 hours) per workshop</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Team Size:</span>
                    <span className="font-medium">{contactInfo.team_size} people</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Base price (up to 8 people):</span>
                    <span className="font-medium">£{result.pricing.basePrice.toLocaleString()}</span>
                  </div>
                  {parseInt(contactInfo.team_size) > 8 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Additional attendees ({parseInt(contactInfo.team_size) - 8} × £{result.pricing.additionalPerPerson.toLocaleString()}):</span>
                      <span className="font-medium">£{((parseInt(contactInfo.team_size) - 8) * result.pricing.additionalPerPerson).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Investment:</span>
                      <span className="text-2xl font-bold text-green-600">
                        £{(() => {
                          const teamSize = parseInt(contactInfo.team_size);
                          const basePrice = result.pricing.basePrice;
                          const additionalCost = teamSize > 8 ? (teamSize - 8) * result.pricing.additionalPerPerson : 0;
                          return (basePrice + additionalCost).toLocaleString();
                        })()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    * Includes materials, instructor fees, and follow-up support. Volume discounts available for teams over 20 people.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={onBackToHome} className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Browse All Workshops
            </Button>
            <Button onClick={resetAssessment} variant="secondary">
              Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredQuestions = getFilteredQuestions();
  const currentQ = filteredQuestions[currentQuestion];
  const currentAnswers = answers[currentQ.id] || [];
  const hasAnswered = currentQ.type === 'contact' 
    ? contactInfo.company_name && contactInfo.contact_name && contactInfo.email && contactInfo.team_size
    : currentAnswers.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {currentQuestion + 1} of {filteredQuestions.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-2">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%`,
            backgroundColor: '#ff6f68'
          }}
        />
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Lightbulb className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skills Assessment</h1>
          <p className="text-lg text-gray-600">Help us recommend the perfect learning track for your team</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{currentQ.title}</h2>
          
          {currentQ.type === 'contact' ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.company_name}
                    onChange={(e) => setContactInfo({...contactInfo, company_name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.contact_name}
                    onChange={(e) => setContactInfo({...contactInfo, contact_name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="h-4 w-4 inline mr-2" />
                    Team Size *
                  </label>
                  <input
                    type="number"
                    value={contactInfo.team_size}
                    onChange={(e) => setContactInfo({...contactInfo, team_size: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Number of people attending"
                    min="1"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={contactInfo.additional_notes}
                  onChange={(e) => setContactInfo({...contactInfo, additional_notes: e.target.value})}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Anything else you'd like us to know?"
                />
              </div>
              <p className="text-sm text-gray-500">* Required fields</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentQ.options?.map((option) => {
                const isSelected = currentAnswers.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQ.id, option.id, currentQ.type as 'single' | 'multiple')}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-red-300 bg-red-50 text-red-800'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-base">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'multiple' && (
            <p className="text-sm text-gray-500 mt-4">Select all that apply</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={prevQuestion}
            variant="secondary"
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!hasAnswered || isSubmitting}
            className="flex items-center"
          >
            {isSubmitting ? 'Submitting...' : 
             currentQuestion === filteredQuestions.length - 1 ? 'Get Results' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
