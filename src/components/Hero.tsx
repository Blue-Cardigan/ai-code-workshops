import { useState, useEffect } from 'react';
import { Calendar, MessageSquare, ArrowRight, Target, Code, CheckCircle, Brain } from 'lucide-react';

interface HeroProps {
  onNavigateToQuestions?: () => void;
}

const Hero = ({ onNavigateToQuestions }: HeroProps) => {
  const [promptText, setPromptText] = useState('');
  const [isPromptComplete, setIsPromptComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  
  const fullPrompt = "Use AI to take my team to the next level";
  
  const learningStages = [
    {
      id: 1,
      title: "Analysing Team Skills",
      description: "Assessing current capabilities and experience levels",
      icon: <Brain className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Identifying Learning Gaps",
      description: "Finding opportunities for AI-enhanced development",
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 3,
      title: "Personalising Curriculum",
      description: "Tailoring workshops to your team's specific needs",
      icon: <Code className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  // Typing animation for prompt
  useEffect(() => {
    if (promptText.length < fullPrompt.length) {
      const timeout = setTimeout(() => {
        setPromptText(fullPrompt.substring(0, promptText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else if (!isPromptComplete) {
      setTimeout(() => {
        setIsPromptComplete(true);
        setShowCursor(false);
        setIsProcessing(true);
      }, 1000);
    }
  }, [promptText, fullPrompt, isPromptComplete]);

  // Cursor blinking
  useEffect(() => {
    if (!isPromptComplete) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPromptComplete]);

  // Sequential stage animation
  useEffect(() => {
    if (isPromptComplete && currentStage < learningStages.length) {
      const timeout = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
        if (currentStage === 0) {
          setIsProcessing(false);
        }
      }, currentStage === 0 ? 1500 : 1200);
      return () => clearTimeout(timeout);
    } else if (isPromptComplete && currentStage === learningStages.length && !showCompletionMessage) {
      // Show completion message with delay after stages complete
      const timeout = setTimeout(() => {
        setShowCompletionMessage(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isPromptComplete, currentStage, learningStages.length, showCompletionMessage]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Floating Particles */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-green-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 min-h-screen flex items-center py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column - AI Prompt Interface */}
            <div className="space-y-8">
              <div className="space-y-6">
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Transform Your Team with{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    AI-Enhanced{' '}
                  </span>
                  Development
                </h1>
              </div>

              {/* AI Prompt Terminal */}
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm shadow-2xl border border-gray-800">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400 ml-4 text-xs">AI Learning Assistant</span>
                </div>
                
                <div className="space-y-3">
                  <div className="text-gray-400">
                    <span className="text-green-400">user@coefficient:~$</span> 
                  </div>
                  <div className="text-white">
                    {promptText}
                    {showCursor && <span className="animate-pulse bg-white w-2 h-5 inline-block ml-1" />}
                  </div>
                  
                  {isPromptComplete && (
                    <div className="text-green-400 mt-4">
                      ✓ Prompt received - Analyzing requirements...
                    </div>
                  )}
                  
                  {isProcessing && (
                    <div className="flex items-center space-x-2 text-blue-400">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>


            </div>

            {/* Right Column - Learning Journey Visualization */}
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">

                {/* Learning Stages */}
                <div className="space-y-6">
                  {learningStages.map((stage, index) => {
                    const isVisible = currentStage > index;
                    const isActive = currentStage === index + 1;
                    
                    return (
                      <div key={stage.id} className="relative">
                        {/* Connecting Line */}
                        {index < learningStages.length - 1 && (
                          <div className="absolute left-6 top-12 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent" />
                        )}
                        
                                                 {/* Stage Card */}
                         <div 
                           className={
                             `flex items-start space-x-4 p-4 rounded-xl border-2 transition-all duration-700 transform ` +
                             (isVisible 
                               ? `${stage.bgColor} ${stage.borderColor} translate-x-0 opacity-100 ` 
                               : 'bg-gray-50 border-gray-200 translate-x-8 opacity-30 ') +
                             (isActive ? 'scale-105 shadow-lg' : '')
                           }
                         >
                          {/* Icon */}
                          <div className={`
                            flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                            ${isVisible ? stage.bgColor : 'bg-gray-100'}
                            ${isVisible ? 'ring-2 ring-white shadow-md' : ''}
                          `}>
                            <div className={isVisible ? stage.color : 'text-gray-400'}>
                              {stage.icon}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`
                              font-semibold transition-colors duration-500
                              ${isVisible ? 'text-gray-900' : 'text-gray-500'}
                            `}>
                              {stage.title}
                            </h4>
                            <p className={`
                              text-sm mt-1 transition-colors duration-500
                              ${isVisible ? 'text-gray-600' : 'text-gray-400'}
                            `}>
                              {stage.description}
                            </p>
                          </div>
                          
                          {/* Status Indicator */}
                          {isVisible && (
                            <div className="flex-shrink-0">
                              {isActive ? (
                                <div className="w-6 h-6 border-2 border-blue-600 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                                </div>
                              ) : (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className={`mt-16 flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-500 ${
            showCompletionMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button 
              onClick={onNavigateToQuestions}
              className="btn-primary group flex items-center justify-center transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Get a Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline group flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Book a Call
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero; 