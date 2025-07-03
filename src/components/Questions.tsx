import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Code, Database, Users, Target, Lightbulb, Mail, Phone, PoundSterlingIcon, Shield, Award, TrendingUp, Star } from 'lucide-react';
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
    workshops: ['Intro to Vibe Coding', 'Git & GitHub for Beginners'],
    icon: <Users className="h-8 w-8" />,
    color: 'green',
    pricing: {
      remote: {
        basePrice: 3200, // £3,200 for 8 people (20% discount for remote) - £400 per person
        additionalPerPerson: 400, // £400 per additional person
      },
      ourLocation: {
        basePrice: 4000, // £4,000 for 8 people (base price) - £500 per person
        additionalPerPerson: 500, // £500 per additional person
      },
      theirOffice: {
        basePrice: 4000, // £4,000 for 8 people
        additionalPerPerson: 500, // £500 per additional person
        travelSurcharge: 800, // £800 travel surcharge
      },
      hybrid: {
        basePrice: 3600, // £3,600 for 8 people (blend of remote/in-person) - £450 per person
        additionalPerPerson: 450, // £450 per additional person
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
        basePrice: 4800, // £4,800 for 8 people (20% discount for remote) - £600 per person
        additionalPerPerson: 600, // £600 per additional person
      },
      ourLocation: {
        basePrice: 6000, // £6,000 for 8 people (base price) - £750 per person
        additionalPerPerson: 750, // £750 per additional person
      },
      theirOffice: {
        basePrice: 6000, // £6,000 for 8 people
        additionalPerPerson: 750, // £750 per additional person
        travelSurcharge: 1200, // £1,200 travel surcharge
      },
      hybrid: {
        basePrice: 5400, // £5,400 for 8 people (blend of remote/in-person) - £675 per person
        additionalPerPerson: 675, // £675 per additional person
      }
    }
  },
  ml: {
    track: 'ml',
    title: 'ML Engineer to AI Dev Track',
    description: 'Transition from traditional ML to modern AI development practices. Bridge the gap between data science and software development.',
    workshops: ['AI-Assisted Notebooks', 'Fine-Tuning the Vibes', 'AI Debugging', 'MLOps with AI Tools'],
    icon: <Database className="h-8 w-8" />,
    color: 'red',
    pricing: {
      remote: {
        basePrice: 6400, // £6,400 for 8 people (20% discount for remote) - £800 per person
        additionalPerPerson: 800, // £800 per additional person
      },
      ourLocation: {
        basePrice: 8000, // £8,000 for 8 people (base price) - £1,000 per person
        additionalPerPerson: 1000, // £1,000 per additional person
      },
      theirOffice: {
        basePrice: 8000, // £8,000 for 8 people
        additionalPerPerson: 1000, // £1,000 per additional person
        travelSurcharge: 1600, // £1,600 travel surcharge
      },
      hybrid: {
        basePrice: 7200, // £7,200 for 8 people (blend of remote/in-person) - £900 per person
        additionalPerPerson: 900, // £900 per additional person
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
    
    const trackScores = { beginner: 0, engineer: 0, ml: 0 };
    
    Object.entries(answers).forEach(([questionId, selectedOptions]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question?.options) {
        selectedOptions.forEach(optionId => {
          const option = question.options?.find(opt => opt.id === optionId);
          if (option?.track) {
            if (option.track === 'any') {
              trackScores.beginner += option.value;
              trackScores.engineer += option.value;
              trackScores.ml += option.value;
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
    const basePrice = pricingDetails.basePrice;
    const additionalCost = Math.max(0, teamSize - 8) * pricingDetails.additionalPerPerson;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Success Banner */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                🎉 Assessment complete! Your personalised training plan is ready.
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
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
            <p className="text-lg text-gray-600">Based on your team's needs, here's our recommended approach</p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Recommended Workshops ({result.workshops.length} sessions):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.workshops.map((workshop, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <div>
                      <span className="text-gray-800 font-medium">{workshop}</span>
                      <div className="text-sm text-gray-500">Half day (4 hours)</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Each workshop is designed as a half-day intensive session with hands-on exercises and real-world applications.
              </p>
            </div>

            {/* Cost Calculation */}
            {contactInfo.team_size && result.pricingBreakdown && (
              <div className="mt-6 bg-white p-6 rounded-lg border-2 border-green-200">
                <div className="flex items-center mb-4">
                  <PoundSterlingIcon className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Investment Quote</h3>
                  {/* Urgency element */}
                  <div className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    Valid for 30 days
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Delivery Method:</span>
                    <span className="font-medium">{result.deliveryLabel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Team Size:</span>
                    <span className="font-medium">{contactInfo.team_size} people</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Base price (up to 8 people):</span>
                    <span className="font-medium">£{result.pricingBreakdown.basePrice.toLocaleString()}</span>
                  </div>
                  {result.pricingBreakdown.additionalCost > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Additional attendees ({result.pricingBreakdown.teamSize - 8} people):</span>
                      <span className="font-medium">£{result.pricingBreakdown.additionalCost.toLocaleString()}</span>
                    </div>
                  )}
                  {result.pricingBreakdown.volumeDiscount && result.pricingBreakdown.volumeDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Volume discount ({result.pricingBreakdown.discountPercentage}% off):</span>
                      <span className="font-medium text-green-600">-£{result.pricingBreakdown.volumeDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  {result.pricingBreakdown.travelSurcharge > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Travel & logistics surcharge:</span>
                      <span className="font-medium">£{result.pricingBreakdown.travelSurcharge.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Investment:</span>
                      <span className="text-2xl font-bold text-green-600">
                        £{result.finalQuoteValue?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">What's Included:</span>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>✓ Expert instruction from AI practitioners</li>
                      <li>✓ All workshop materials and resources</li>
                      <li>✓ 30-day post-training support</li>
                      <li>✓ Certificate of completion</li>
                      <li>✓ Money-back satisfaction guarantee</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    * Minimum 8 people required. Volume discounts: 15% off for 11-25 people, 25% off for 25+ people.
                    Quote valid for 30 days from assessment date.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Social Proof Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-900">200+</div>
                <div className="text-sm text-blue-700">London companies trained</div>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-900">340%</div>
                <div className="text-sm text-green-700">Average ROI within 6 months</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-yellow-600 mb-2" />
                <div className="text-2xl font-bold text-yellow-900">4.9/5</div>
                <div className="text-sm text-yellow-700">Average workshop rating</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-6 text-white/90">
              Book a 15-minute call to discuss your training plan and secure your preferred dates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary group flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Book Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={`mailto:${contactInfo.email}?subject=AI Training Quote - ${result.title}&body=Hello ${contactInfo.contact_name},%0D%0A%0D%0AThank you for completing our AI Training Assessment! Here's your personalized quote:%0D%0A%0D%0ACompany: ${contactInfo.company_name}%0D%0ARecommended Track: ${result.title}%0D%0ATeam Size: ${contactInfo.team_size} people%0D%0ADelivery Method: ${result.deliveryLabel}%0D%0ATotal Investment: £${result.finalQuoteValue?.toLocaleString()}%0D%0A%0D%0AWorkshops Included:%0D%0A${result.workshops.map((workshop, i) => `${i + 1}. ${workshop}`).join('%0D%0A')}%0D%0A%0D%0AThis quote is valid for 30 days. To secure your preferred dates or discuss any questions, please reply to this email or book a discovery call.%0D%0A%0D%0ABest regards,%0D%0AThe Coefficient Team`}
                className="btn-secondary group flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email This Quote
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
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
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBackToHome}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
              
              {/* Progress indicator */}
              <div className="flex items-center space-x-2">
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
            </div>
          </div>
        </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <Lightbulb className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Training <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">Readiness Assessment</span>
          </h1>
          <p className="text-lg text-gray-600">
            Let's find the perfect training approach for your team
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
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
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
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

        {/* Trust indicators at bottom */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>🔒 Your information is secure and will only be used to provide your personalised quote</p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
