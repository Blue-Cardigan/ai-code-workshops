import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Database, Users, Target, Lightbulb, Mail, Phone, Shield, Award, TrendingUp, Smartphone } from 'lucide-react';


import { supabase } from '../lib/supabase';
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
    track?: 'beginner' | 'engineer' | 'data' | 'any';
  }[];
  conditional?: {
    dependsOn: number;
    showWhen: string | string[];
  };
}

interface AssessmentResult {
  track: 'beginner' | 'engineer' | 'data';
  title: string;
  description: string;
  workshops: string[];
  icon: React.ReactNode;
  color: string;
  pricing: {
    remote: {
      basePrice: number; // Price for up to 8 people
      additionalPerPerson: number; // Additional cost per person beyond 8
    };
    ourLocation: {
      basePrice: number;
      additionalPerPerson: number;
    };
    theirOffice: {
      basePrice: number;
      additionalPerPerson: number;
      travelSurcharge: number; // Fixed travel cost
    };
    hybrid: {
      basePrice: number;
      additionalPerPerson: number;
    };
  };
  deliveryMode?: keyof AssessmentResult['pricing'];
  deliveryLabel?: string;
  finalQuoteValue?: number;
  pricingBreakdown?: {
    basePrice: number;
    additionalCost: number;
    travelSurcharge: number;
    teamSize: number;
    volumeDiscount?: number;
    discountPercentage?: number;
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
      { id: 'data-team', text: 'Upskilling data analysts', value: 1, track: 'engineer' },
      { id: 'tool-implementation', text: 'Identifying and implementing best AI tools', value: 4, track: 'any' }
    ]
  },
  {
    id: 3,
    title: "Which roles will be taking this training?",
    type: 'multiple',
    conditional: {
      dependsOn: 2,
      showWhen: ['non-tech-coding', 'tool-implementation']
    },
    options: [
      { id: 'product', text: 'Product/Project Managers', value: 0, track: 'beginner' },
      { id: 'operations', text: 'Operations/Admin Staff', value: 1, track: 'beginner' },
      { id: 'sales-marketing', text: 'Sales/Marketing Teams', value: 2, track: 'beginner' },
      { id: 'leadership', text: 'Department Leadership', value: 3, track: 'beginner' },
      { id: 'analysts', text: 'Business Analysts', value: 4, track: 'beginner' }
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
      { id: 'in-office', text: 'Training at your own office', value: 0 },
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
    workshops: ['Intro to Vibe Coding', 'Git & GitHub for Beginners'],
    icon: <Users className="h-8 w-8" />,
    color: 'green',
    pricing: {
      remote: {
        basePrice: 32000, // £32,000 for 8 people (20% discount for remote) - £4,000 per person
        additionalPerPerson: 4000, // £4,000 per additional person
      },
      ourLocation: {
        basePrice: 40000, // £40,000 for 8 people (base price) - £5,000 per person
        additionalPerPerson: 5000, // £5,000 per additional person
      },
      theirOffice: {
        basePrice: 40000, // £40,000 for 8 people
        additionalPerPerson: 5000, // £5,000 per additional person
        travelSurcharge: 8000, // £8,000 travel surcharge
      },
      hybrid: {
        basePrice: 36000, // £36,000 for 8 people (blend of remote/in-person) - £4,500 per person
        additionalPerPerson: 4500, // £4,500 per additional person
      }
    }
  },
  engineer: {
    track: 'engineer',
    title: 'AI-Augmented Engineer Track',
    description: 'Level up your development skills with AI-powered tools and workflows. Perfect for developers looking to boost productivity.',
    workshops: ['Develop Like a Pro', 'Testing in the Age of Copilot', 'From Playground to Production', 'Cursor + Claude + GitHub'],
    icon: <Code className="h-8 w-8" />,
    color: 'blue',
    pricing: {
      remote: {
        basePrice: 48000, // £48,000 for 8 people (20% discount for remote) - £6,000 per person
        additionalPerPerson: 6000, // £6,000 per additional person
      },
      ourLocation: {
        basePrice: 60000, // £60,000 for 8 people (base price) - £7,500 per person
        additionalPerPerson: 7500, // £7,500 per additional person
      },
      theirOffice: {
        basePrice: 60000, // £60,000 for 8 people
        additionalPerPerson: 7500, // £7,500 per additional person
        travelSurcharge: 12000, // £12,000 travel surcharge
      },
      hybrid: {
        basePrice: 54000, // £54,000 for 8 people (blend of remote/in-person) - £6,750 per person
        additionalPerPerson: 6750, // £6,750 per additional person
      }
    }
  },
  data: {
    track: 'data',
    title: 'Data Scientist to AI Dev Track',
    description: 'Transition from traditional data science to modern AI development practices. Bridge the gap between data science and software development.',
    workshops: ['AI-Assisted Notebooks', 'Data Engineering with AI', 'AI Debugging', 'DataOps with AI Tools'],
    icon: <Database className="h-8 w-8" />,
    color: 'red',
    pricing: {
      remote: {
        basePrice: 64000, // £64,000 for 8 people (20% discount for remote) - £8,000 per person
        additionalPerPerson: 8000, // £8,000 per additional person
      },
      ourLocation: {
        basePrice: 80000, // £80,000 for 8 people (base price) - £10,000 per person
        additionalPerPerson: 10000, // £10,000 per additional person
      },
      theirOffice: {
        basePrice: 80000, // £80,000 for 8 people
        additionalPerPerson: 10000, // £10,000 per additional person
        travelSurcharge: 16000, // £16,000 travel surcharge
      },
      hybrid: {
        basePrice: 72000, // £72,000 for 8 people (blend of remote/in-person) - £9,000 per person
        additionalPerPerson: 9000, // £9,000 per additional person
      }
    }
  }
};

const Assessment: React.FC<AssessmentProps> = ({ onBackToHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMagicMoment, setShowMagicMoment] = useState(false);
  const [quoteRevealed, setQuoteRevealed] = useState(false);
  const [expandedWorkshops, setExpandedWorkshops] = useState<Set<number>>(new Set());
  const [contactInfo, setContactInfo] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    team_size: ''
  });

  // Track assessment start
  useEffect(() => {
    track.assessmentStarted();
  }, []);

  const handleAnswer = (questionId: number, optionId: string, type: 'single' | 'multiple') => {
    if (type === 'single') {
      setAnswers({ ...answers, [questionId]: [optionId] });
    } else {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId];
      setAnswers({ ...answers, [questionId]: newAnswers });
    }
  };

  const calculateResult = async () => {
    setIsSubmitting(true);
    
    const trackScores = { beginner: 0, engineer: 0, data: 0 };
    
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question?.options) {
        selectedOptions.forEach(optionId => {
          const option = question.options?.find(opt => opt.id === optionId);
          if (option?.track) {
            if (option.track === 'any') {
              trackScores.beginner += option.value;
              trackScores.engineer += option.value;
              trackScores.data += option.value;
            } else {
              trackScores[option.track] += option.value;
            }
          }
        });
      }
    });

    const bestTrack = Object.entries(trackScores).reduce((a, b) => 
      trackScores[a[0] as keyof typeof trackScores] > trackScores[b[0] as keyof typeof trackScores] ? a : b
    )[0] as keyof typeof trackResults;

    const trackResult = { ...trackResults[bestTrack] };

    // Calculate pricing based on delivery preference and team size
    const deliveryAnswer = answers[4]?.[0];
    const locationAnswer = answers[5]?.[0];
    const teamSize = parseInt(contactInfo.team_size) || 8;

    let deliveryMode: keyof AssessmentResult['pricing'] = 'remote';
    let deliveryLabel = 'Remote Training';

    if (deliveryAnswer === 'in-person') {
      if (locationAnswer === 'in-office') {
        deliveryMode = 'theirOffice';
        deliveryLabel = 'At Your Office';
      } else {
        deliveryMode = 'ourLocation';
        deliveryLabel = 'At Our Location';
      }
    } else if (deliveryAnswer === 'hybrid') {
      deliveryMode = 'hybrid';
      deliveryLabel = 'Hybrid Training';
    }

    const pricingDetails = trackResult.pricing[deliveryMode];
    // Apply workshop scaling to base price (more workshops = higher base cost)
    const workshopScaling = trackResult.workshops.length / 2; // Scale based on number of workshops (2 workshops = 1x, 4 workshops = 2x)
    const scaledBasePrice = Math.round(pricingDetails.basePrice * workshopScaling);
    const scaledAdditionalCost = Math.round(pricingDetails.additionalPerPerson * workshopScaling);
    
    const basePrice = scaledBasePrice;
    const additionalCost = Math.max(0, teamSize - 8) * scaledAdditionalCost;
    const travelSurcharge = 'travelSurcharge' in pricingDetails ? pricingDetails.travelSurcharge : 0;

    const subtotal = basePrice + additionalCost + travelSurcharge;
    let volumeDiscount = 0;
    let discountPercentage = 0;

    // Volume discounts
    if (teamSize >= 25) {
      discountPercentage = 25;
      volumeDiscount = subtotal * 0.25;
    } else if (teamSize >= 11) {
      discountPercentage = 15;
      volumeDiscount = subtotal * 0.15;
    }

    const finalQuoteValue = subtotal - volumeDiscount;

    trackResult.deliveryMode = deliveryMode;
    trackResult.deliveryLabel = deliveryLabel;
    trackResult.finalQuoteValue = finalQuoteValue;
    trackResult.pricingBreakdown = {
      basePrice,
      additionalCost,
      travelSurcharge,
      teamSize,
      volumeDiscount,
      discountPercentage
    };

    setResult(trackResult);

    // Submit to database
    try {
      if (contactInfo.company_name && contactInfo.contact_name && contactInfo.email) {
        await supabase.from('assessment_submissions').insert({
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
    
    // Trigger magic moment animation after a short delay
    setTimeout(() => {
      setShowMagicMoment(true);
    }, 500);
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

  const getpersonalisedTitle = (track: string, teamSize: number, companyName: string) => {
    const titles = {
      beginner: [
        'Visionary Code Explorer',
        'Digital Innovation Pioneer', 
        'AI-Curious Leader',
        'Future-Forward Innovator'
      ],
      engineer: [
        'Tech Excellence Architect',
        'AI Development Catalyst',
        'Code Optimisation Expert',
        'Engineering Evolution Leader'
      ],
      data: [
        'Data Transformation Specialist',
        'Data Strategy Maestro',
        'Data Science Innovator',
        'Data Pioneer'
      ]
    };
    
    const trackTitles = titles[track as keyof typeof titles] || titles.beginner;
    const index = (companyName.length + teamSize) % trackTitles.length;
    return trackTitles[index];
  };

  const getCardGradient = (track: string) => {
    const gradients = {
      beginner: 'from-emerald-400 via-teal-500 to-green-600',
      engineer: 'from-blue-400 via-purple-500 to-indigo-600', 
      data: 'from-red-400 via-pink-500 to-rose-600'
    };
    return gradients[track as keyof typeof gradients] || gradients.beginner;
  };

  const getCardPattern = (track: string) => {
    const patterns = {
      beginner: (
        <div className="absolute top-4 right-4 w-32 h-32 opacity-20">
          <div className="w-full h-full rounded-full bg-white/30"></div>
          <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white/20"></div>
        </div>
      ),
      engineer: (
        <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
          <div className="w-full h-full bg-white/20 transform rotate-45 rounded-md"></div>
          <div className="absolute top-8 left-8 w-24 h-24 bg-white/15 transform -rotate-12 rounded-md"></div>
        </div>
      ),
      data: (
        <div className="absolute top-4 right-4 w-36 h-36 opacity-25">
          <div className="w-full h-full border-4 border-white/30 rounded-full"></div>
          <div className="absolute top-6 left-6 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-12 left-12 w-12 h-12 bg-white/15 rounded-full"></div>
        </div>
      )
    };
    return patterns[track as keyof typeof patterns] || patterns.beginner;
  };

  const toggleWorkshop = (index: number) => {
    const newExpanded = new Set(expandedWorkshops);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedWorkshops(newExpanded);
  };

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

        {/* Result */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!quoteRevealed && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600">Are you ready to be <span className="font-bold text-blue-600">dazzled</span>...</p>
          </div>
          )}
          {/* personalised Arc-style Card */}
          <div className={`transform transition-all duration-1000 ${showMagicMoment ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div 
              className={`relative rounded-md overflow-hidden shadow-2xl transition-all duration-1000 ${
                quoteRevealed 
                  ? 'bg-white border-4 border-transparent' 
                  : `bg-gradient-to-br ${getCardGradient(result.track)} cursor-pointer hover:shadow-3xl hover:scale-[1.02]`
              }`}
              style={quoteRevealed ? {
                background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${
                  getCardGradient(result.track).includes('emerald') ? '#34d399, #059669' : 
                  getCardGradient(result.track).includes('blue') ? '#60a5fa, #4338ca' : '#f87171, #dc2626'
                }) border-box`
              } as React.CSSProperties : {}}
              onClick={() => !quoteRevealed && setQuoteRevealed(true)}
            >
              {/* Main card sheen effect after reveal */}
              {quoteRevealed && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer pointer-events-none z-50"></div>
              )}
              {/* Header gradient section when revealed */}
              {quoteRevealed && (
                <div className={`relative bg-gradient-to-br ${getCardGradient(result.track)} px-8 pt-8 pb-6`}>
                  {getCardPattern(result.track)}
                  <div className="relative z-10">
                    <div className="flex flex-col items-start mb-4 text-white">
                      <h1 className="text-4xl font-bold mb-2">
                        {contactInfo.contact_name}
                      </h1>
                      <p className="text-xl font-medium text-white/90">
                        {getpersonalisedTitle(result.track, parseInt(contactInfo.team_size), contactInfo.company_name)}
                      </p>
                      <p className="mt-2 text-white/80">
                        {contactInfo.company_name}
                      </p>
                    </div>

                    {/* Track Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="font-medium mr-2 text-white">
                        {result.track.toUpperCase()}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                      <span className="ml-2 text-sm text-white/90">
                        {contactInfo.team_size} people
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Background Pattern for non-revealed state */}
              {!quoteRevealed && getCardPattern(result.track)}
              
              {/* Card Content */}
              <div className={`relative z-10 ${quoteRevealed ? 'p-8' : 'p-8'}`}>
                {/* Static diagonal sheen for white background */}
                {quoteRevealed && (
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/40 via-transparent to-white/20 transform rotate-12 scale-150 pointer-events-none opacity-60"></div>
                )}
                {!quoteRevealed && (
                  <>
                    <div className="flex flex-col items-start mb-6 text-white">
                      <h1 className="text-4xl font-bold mb-2">
                        {contactInfo.contact_name}
                      </h1>
                      <p className="text-xl font-medium text-white/90">
                        {getpersonalisedTitle(result.track, parseInt(contactInfo.team_size), contactInfo.company_name)}
                      </p>
                      <p className="mt-2 text-white/80">
                        {contactInfo.company_name}
                      </p>
                    </div>

                    {/* Track Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                      <span className="font-medium mr-2 text-white">
                        {result.track.toUpperCase()}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-white opacity-60"></div>
                      <span className="ml-2 text-sm text-white/90">
                        {contactInfo.team_size} people
                      </span>
                    </div>
                  </>
                )}

                {/* Click to Reveal Prompt */}
                {!quoteRevealed && showMagicMoment && (
                  <div className={`transform transition-all duration-1500 delay-500 ${
                    showMagicMoment ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-md p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center justify-center mb-3">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-semibold text-lg">Your personalised Quote</h3>
                          <p className="text-white/70 text-sm">Click to reveal your training investment</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-white/60">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Quote Reveal */}
                {quoteRevealed && (
                  <div className="transform transition-all duration-1000 animate-in slide-in-from-bottom-4">
                      {/* Quote Header */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Main Quote Display */}
                      <div className={`rounded-md p-8 mb-8 border relative overflow-hidden ${
                        quoteRevealed ? `bg-gradient-to-br ${
                          result.track === 'beginner' ? 'from-emerald-50 via-teal-50 to-green-100 border-emerald-200' :
                          result.track === 'engineer' ? 'from-blue-50 via-indigo-50 to-purple-100 border-blue-200' :
                          'from-rose-50 via-pink-50 to-red-100 border-rose-200'
                        }` : 'bg-white/20 border-white/30'
                      }`}>
                        {/* Sheen effect for white background */}
                        {quoteRevealed && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
                        )}
                        <div className="text-center relative z-10">
                          <div className={`text-sm font-semibold mb-3 tracking-wide uppercase ${quoteRevealed ? 'text-gray-600' : 'text-white/90'}`}>
                            Total Investment
                          </div>
                          <div className={`text-6xl font-black mb-6 tracking-tight ${quoteRevealed ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-white'}`}>
                            £{result.finalQuoteValue?.toLocaleString()}
                          </div>
                          <div className="grid grid-cols-3 gap-6 text-center">
                            <div className={`p-4 rounded-md ${quoteRevealed ? 'bg-blue-50 border border-blue-100' : 'bg-white/10'}`}>
                              <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${quoteRevealed ? 'text-blue-600' : 'text-white/60'}`}>Track</div>
                              <div className={`font-semibold text-sm ${quoteRevealed ? 'text-blue-900' : 'text-white'}`}>
                                {result.title}
                              </div>
                            </div>
                            <div className={`p-4 rounded-md ${quoteRevealed ? 'bg-green-50 border border-green-100' : 'bg-white/10'}`}>
                              <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${quoteRevealed ? 'text-green-600' : 'text-white/60'}`}>Sessions</div>
                              <div className={`font-semibold text-sm ${quoteRevealed ? 'text-green-900' : 'text-white'}`}>
                                {result.workshops.length} workshops
                              </div>
                            </div>
                            <div className={`p-4 rounded-md ${quoteRevealed ? 'bg-purple-50 border border-purple-100' : 'bg-white/10'}`}>
                              <div className={`text-xs font-medium mb-1 uppercase tracking-wide ${quoteRevealed ? 'text-purple-600' : 'text-white/60'}`}>Format</div>
                              <div className={`font-semibold text-sm ${quoteRevealed ? 'text-purple-900' : 'text-white'}`}>
                                {result.deliveryLabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Combined Workshops & What's Included Section */}
                      <div className={`rounded-md p-8 mb-8 border relative overflow-hidden ${
                        quoteRevealed ? `bg-gradient-to-br ${
                          result.track === 'beginner' ? 'from-teal-100 via-emerald-100 to-green-200 border-teal-300' :
                          result.track === 'engineer' ? 'from-indigo-100 via-blue-100 to-purple-200 border-indigo-300' :
                          'from-pink-100 via-rose-100 to-red-200 border-pink-300'
                        }` : 'bg-white/15 border-white/20'
                      }`}>
                        {/* Sheen effect for white background */}
                        {quoteRevealed && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer animation-delay-1000"></div>
                        )}
                        <div className="relative z-10">
                          <div className="flex items-center mb-6">
                            <div className={`p-3 rounded-md mr-4 ${quoteRevealed ? `${
                              result.track === 'beginner' ? 'bg-emerald-100' :
                              result.track === 'engineer' ? 'bg-indigo-100' :
                              'bg-rose-100'
                            }` : 'bg-white/20'}`}>
                              <Shield className={`h-6 w-6 ${quoteRevealed ? `${
                                result.track === 'beginner' ? 'text-emerald-600' :
                                result.track === 'engineer' ? 'text-indigo-600' :
                                'text-rose-600'
                              }` : 'text-white'}`} />
                            </div>
                            <div>
                              <h4 className={`text-xl font-bold ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>
                                What's Included
                              </h4>
                              <p className={`text-sm ${quoteRevealed ? 'text-gray-600' : 'text-white/70'}`}>
                                {result.workshops.length} intensive workshops + complete support package
                              </p>
                            </div>
                          </div>
                          
                          {/* Workshops List */}
                          <div className="space-y-3 mb-6">
                            {result.workshops.map((workshop, index) => (
                              <div key={index} className={`rounded-md border transition-all duration-300 ${
                                quoteRevealed ? `${
                                  result.track === 'beginner' ? 'border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm hover:shadow-emerald-100' :
                                  result.track === 'engineer' ? 'border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm hover:shadow-indigo-100' :
                                  'border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50 shadow-sm hover:shadow-rose-100'
                                }` : 'border-white/20 bg-white/10'
                              }`}>
                                <button
                                  onClick={() => toggleWorkshop(index)}
                                  className={`w-full flex items-center justify-between p-5 text-left transition-all duration-200 ${
                                    quoteRevealed ? 'hover:bg-blue-50 rounded-md' : 'hover:bg-white/20 rounded-md'
                                  }`}
                                >
                                  <div className="flex items-center flex-1">
                                    <div className={`p-2 rounded-lg mr-4 ${
                                      quoteRevealed ? 'bg-green-100' : 'bg-green-500/20'
                                    }`}>
                                      <CheckCircle className={`h-5 w-5 ${
                                        quoteRevealed ? 'text-green-600' : 'text-green-300'
                                      }`} />
                                    </div>
                                    <div>
                                      <span className={`font-semibold text-base ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>
                                        {workshop}
                                      </span>
                                      <div className={`text-sm mt-1 ${quoteRevealed ? 'text-blue-600' : 'text-white/70'}`}>
                                        Half day session • 4 hours
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`transform transition-transform duration-200 p-2 rounded-lg ${
                                    expandedWorkshops.has(index) ? 'rotate-180' : ''
                                  } ${quoteRevealed ? 'text-gray-400 hover:bg-gray-100' : 'text-white/70'}`}>
                                    <ArrowRight className="w-4 h-4 transform rotate-90" />
                                  </div>
                                </button>
                                {expandedWorkshops.has(index) && (
                                  <div className={`px-5 pb-5 text-sm border-t ${
                                    quoteRevealed ? 'border-blue-100 text-gray-700 bg-blue-25' : 'border-white/20 text-white/80'
                                  }`}>
                                    <div className="pt-4 pl-12">
                                      <p className="leading-relaxed">
                                        Hands-on practical session covering essential skills and real-world applications. 
                                        Includes guided exercises, group work, and immediate business application opportunities.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Additional Package Inclusions */}
                          <div className="grid md:grid-cols-2 gap-4 mb-6">
                            {[
                              { icon: Users, text: "Expert instruction from AI practitioners" },
                              { icon: Database, text: "All workshop materials and resources" },
                              { icon: Phone, text: "30-day post-training support" },
                              { icon: Award, text: "Certificate of completion" },
                            ].map((item, index) => (
                              <div key={index} className={`flex items-center p-4 rounded-md transition-all duration-200 ${
                                quoteRevealed 
                                  ? `${
                                      result.track === 'beginner' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-emerald-100' :
                                      result.track === 'engineer' ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 hover:shadow-indigo-100' :
                                      'bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 hover:shadow-rose-100'
                                    } hover:shadow-md` 
                                  : 'bg-white/10 hover:bg-white/20'
                              }`}>
                                <div className={`p-2 rounded-lg mr-4 ${
                                  quoteRevealed 
                                    ? `${
                                        result.track === 'beginner' ? 'bg-emerald-100' :
                                        result.track === 'engineer' ? 'bg-indigo-100' :
                                        'bg-rose-100'
                                      }` 
                                    : 'bg-green-500/20'
                                }`}>
                                  <item.icon className={`w-5 h-5 ${
                                    quoteRevealed 
                                      ? `${
                                          result.track === 'beginner' ? 'text-emerald-600' :
                                          result.track === 'engineer' ? 'text-indigo-600' :
                                          'text-rose-600'
                                        }` 
                                      : 'text-green-300'
                                  }`} />
                                </div>
                                <span className={`font-medium text-sm ${
                                  quoteRevealed ? 'text-gray-800' : 'text-white'
                                }`}>
                                  {item.text}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className={`p-4 rounded-md ${
                            quoteRevealed ? `${
                              result.track === 'beginner' ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200' :
                              result.track === 'engineer' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200' :
                              'bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200'
                            }` : 'bg-white/10'
                          } shadow-sm`}>
                            <p className={`text-sm text-center ${
                              quoteRevealed ? `${
                                result.track === 'beginner' ? 'text-teal-700' :
                                result.track === 'engineer' ? 'text-blue-700' :
                                'text-pink-700'
                              }` : 'text-white/80'
                            }`}>
                              Each workshop builds on the previous, creating a <span className="font-bold">talent-stacked challenge-tackling team</span>
                            </p>
                          </div>
                        </div>
                      </div>



                      {/* Detailed Pricing Breakdown */}
                      {contactInfo.team_size && result.pricingBreakdown && (
                        <div className={`rounded-md p-6 mb-6 border relative overflow-hidden ${
                          quoteRevealed ? `bg-gradient-to-br ${
                            result.track === 'beginner' ? 'from-emerald-25 via-teal-25 to-green-50 border-emerald-200' :
                            result.track === 'engineer' ? 'from-blue-25 via-indigo-25 to-purple-50 border-blue-200' :
                            'from-rose-25 via-pink-25 to-red-50 border-rose-200'
                          }` : 'bg-white/15 border-white/20'
                        }`}>
                          {/* Sheen effect for white background */}
                          {quoteRevealed && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer animation-delay-2000"></div>
                          )}
                          <div className="relative z-10">
                            <h4 className={`text-lg font-semibold mb-4 ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>Investment Breakdown</h4>
                            <div className="space-y-3">
                              {(() => {
                                // For remote training, show standard price vs actual to highlight savings
                                const standardPrice = result.pricing.ourLocation.basePrice;
                                const showRemoteDiscount = result.deliveryMode === 'remote' && result.pricingBreakdown.basePrice < standardPrice;
                                const remoteDiscount = showRemoteDiscount ? standardPrice - result.pricingBreakdown.basePrice : 0;
                                
                                return (
                                  <>
                                    {showRemoteDiscount ? (
                                      <>
                                        <div className="flex justify-between items-center">
                                          <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Standard price (up to 8 people):</span>
                                          <span className={`font-medium ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>£{standardPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Remote training discount:</span>
                                          <span className={`font-medium ${quoteRevealed ? 'text-green-600' : 'text-green-300'}`}>-£{remoteDiscount.toLocaleString()}</span>
                                        </div>
                                      </>
                                    ) : (
                                      <div className="flex justify-between items-center">
                                        <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Base price (up to 8 people):</span>
                                        <span className={`font-medium ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>£{result.pricingBreakdown.basePrice.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {result.pricingBreakdown.additionalCost > 0 && (
                                      <div className="flex justify-between items-center">
                                        <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Additional attendees ({result.pricingBreakdown.teamSize - 8} people):</span>
                                        <span className={`font-medium ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>£{result.pricingBreakdown.additionalCost.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {result.pricingBreakdown.travelSurcharge > 0 && (
                                      <div className="flex justify-between items-center">
                                        <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Travel & logistics surcharge:</span>
                                        <span className={`font-medium ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>£{result.pricingBreakdown.travelSurcharge.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {result.pricingBreakdown.teamSize >= 11 && result.pricingBreakdown.volumeDiscount && result.pricingBreakdown.volumeDiscount > 0 && (
                                      <div className="flex justify-between items-center">
                                        <span className={`${quoteRevealed ? 'text-gray-600' : 'text-white/80'}`}>Volume discount ({result.pricingBreakdown.discountPercentage}% off):</span>
                                        <span className={`font-medium ${quoteRevealed ? 'text-green-600' : 'text-green-300'}`}>-£{result.pricingBreakdown.volumeDiscount.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <div className={`border-t pt-3 ${quoteRevealed ? 'border-gray-200' : 'border-white/20'}`}>
                                      <div className="flex justify-between items-center">
                                        <span className={`text-lg font-semibold ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>Total Investment:</span>
                                        <span className={`text-2xl font-bold ${quoteRevealed ? 'text-gray-900' : 'text-white'}`}>
                                          £{result.finalQuoteValue?.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Urgency Indicator */}
                      <div className={`rounded-md p-4 border ${
                        quoteRevealed 
                          ? `bg-gradient-to-r ${
                              result.track === 'beginner' ? 'from-orange-100 via-amber-100 to-yellow-100 border-orange-300' :
                              result.track === 'engineer' ? 'from-violet-100 via-purple-100 to-indigo-100 border-violet-300' :
                              'from-rose-100 via-pink-100 to-red-100 border-rose-300'
                            }` 
                          : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/30'
                      }`}>
                        <div className="flex items-center justify-center space-x-2">
                          <div className={`w-2 h-2 rounded-md animate-pulse ${
                            quoteRevealed ? `${
                              result.track === 'beginner' ? 'bg-orange-500' :
                              result.track === 'engineer' ? 'bg-violet-500' :
                              'bg-rose-500'
                            }` : 'bg-red-400'
                          }`}></div>
                          <span className={`font-medium text-sm ${
                            quoteRevealed ? `${
                              result.track === 'beginner' ? 'text-orange-700' :
                              result.track === 'engineer' ? 'text-violet-700' :
                              'text-rose-700'
                            }` : 'text-white'
                          }`}>Book within 30 days</span>
                          <div className={`w-2 h-2 rounded-md animate-pulse ${
                            quoteRevealed ? `${
                              result.track === 'beginner' ? 'bg-orange-500' :
                              result.track === 'engineer' ? 'bg-violet-500' :
                              'bg-rose-500'
                            }` : 'bg-red-400'
                          }`}></div>
                        </div>
                      </div>

                      <p className={`text-xs text-center mt-4 ${
                        quoteRevealed ? 'text-gray-500' : 'text-white/60'
                      }`}>
                        * Minimum 8 people required. Volume discounts: 15% off for 11-25 people, 25% off for 25+ people.
                        Quote valid for 30 days from assessment date.
                      </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          

          {/* Sections below only show after quote reveal */}
          {quoteRevealed && (
            <div className="transform transition-all duration-700 animate-in slide-in-from-bottom-4">
              {/* Social Proof Section */}
              

          {/* Next Steps */}
          <div 
            className={`rounded-md overflow-hidden shadow-2xl transition-all duration-700 delay-600 my-8 transform ${
              quoteRevealed ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{
              background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, ${
                getCardGradient(result.track).includes('emerald') ? '#34d399, #059669' : 
                getCardGradient(result.track).includes('blue') ? '#60a5fa, #4338ca' : '#f87171, #dc2626'
              }) border-box`
            } as React.CSSProperties}
          >
            {/* Header gradient section */}
            <div className={`relative bg-gradient-to-br ${getCardGradient(result.track)} px-8 pt-8 pb-6`}>
              {getCardPattern(result.track)}
              <div className="relative z-10 text-center text-white">
                <p className="text-lg mb-2 text-white/90">
                  Excited? So are we!
                </p>
                <p className="text-lg mb-2 text-white/80">
                  Book a 15-minute call to secure your preferred dates.
                </p>
              </div>
            </div>
            
            {/* Content section */}
            <div className="relative bg-white p-8 text-center border-4 border-transparent">
              {/* Sheen effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer animation-delay-4000"></div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary group flex items-center justify-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Get it in the Cal
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a 
                    href={`mailto:john@coefficient.ai?subject=AI Training Quote - ${result.title}&body=Hello ${contactInfo.contact_name},%0D%0A%0D%0AThank you for completing our AI Training Assessment! Here's your personalised quote:%0D%0A%0D%0ACompany: ${contactInfo.company_name}%0D%0ARecommended Track: ${result.title}%0D%0ATeam Size: ${contactInfo.team_size} people%0D%0ADelivery Method: ${result.deliveryLabel}%0D%0ATotal Investment: £${result.finalQuoteValue?.toLocaleString()}%0D%0A%0D%0AWorkshops Included:%0D%0A${result.workshops.map((workshop, i) => `${i + 1}. ${workshop}`).join('%0D%0A')}%0D%0A%0D%0AThis quote is valid for 30 days. To secure your preferred dates or discuss any questions, please reply to this email or book a discovery call.%0D%0A%0D%0ABest regards,%0D%0AThe Coefficient Team`}
                    className="btn-secondary group flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email This Quote
                  </a>
                </div>
              </div>
            </div>
          </div>

              <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transform transition-all duration-500 delay-800 ${
                quoteRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <button onClick={onBackToHome} className="text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center group">
                  <Target className="h-4 w-4 mr-2" />
                  Browse All Workshops
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={resetAssessment} className="text-gray-600 hover:text-gray-800 transition-colors font-medium">
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Social Proof Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 text-sm font-medium">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>Trusted by 50+ London departments</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>80% reduction in IT tickets</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>500+ non-technical staff trained</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-10 left-0 z-10 p-4">
        <button
          onClick={onBackToHome}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Lightbulb className="h-8 w-8" />
          </div>
          <p className="text-lg text-gray-600">
            Let's find the perfect training approach for your team
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-md shadow-xl border border-gray-200/50 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {currentQ.title}
            </h2>

            {currentQ.type === 'contact' ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.company_name}
                      onChange={(e) => setContactInfo({...contactInfo, company_name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={contactInfo.contact_name}
                      onChange={(e) => setContactInfo({...contactInfo, contact_name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your work email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size for Training *
                    </label>
                    <input
                      type="number"
                      min="8"
                      value={contactInfo.team_size}
                      onChange={(e) => setContactInfo({...contactInfo, team_size: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 8 people"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                {/* Trust indicators */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>GDPR Compliant</span>
                    </div>
                    <span>•</span>
                    <span>No spam, ever</span>
                    <span>•</span>
                    <span>Instant quote delivery</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentQ.options?.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(currentQ.id, option.id, currentQ.type as 'single' | 'multiple')}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                      currentAnswers.includes(option.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        currentAnswers.includes(option.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {currentAnswers.includes(option.id) && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={`font-medium ${
                        currentAnswers.includes(option.id) ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="pt-6 border-t border-gray-200">
            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {filteredQuestions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`btn-secondary flex items-center ${
                  currentQuestion === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={!hasAnswered || isSubmitting}
                className={`btn-primary flex items-center ${
                  !hasAnswered || isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : currentQuestion === filteredQuestions.length - 1 ? (
                  <>
                    Get My Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators at bottom */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>🔒 Your information is secure and will only be used to provide your personalised quote</p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
