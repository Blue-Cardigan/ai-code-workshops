import { useState, useEffect, useRef } from 'react';
import { Calendar, MessageSquare, ArrowRight, Target, Code, CheckCircle, Brain, SkipForward } from 'lucide-react';

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
  const [isAnimationSkipped, setIsAnimationSkipped] = useState(false);
  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(false);
  
  // Interactive dots state
  const [connections, setConnections] = useState<Array<{from: number, to: number}>>([]);
  const [selectedDot, setSelectedDot] = useState<number | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const dotRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  
  const fullPrompt = "Use AI to take my team to the next level.";
  
  // Interactive dots configuration
  const interactiveDots = [
    { id: 0, x: 'left-8', y: 'top-16', size: 'w-3 h-3', color: 'bg-blue-400/15', delay: '0s' },
    { id: 1, x: 'right-16', y: 'top-32', size: 'w-2 h-2', color: 'bg-purple-400/25', delay: '0.5s' },
    { id: 2, x: 'left-1/4', y: 'top-48', size: 'w-5 h-5', color: 'bg-teal-400/20', delay: '1.2s' },
    { id: 3, x: 'right-32', y: 'top-64', size: 'w-7 h-7', color: 'bg-indigo-400/15', delay: '2.1s' },
    { id: 4, x: 'left-16', y: 'top-80', size: 'w-4 h-4', color: 'bg-pink-400/20', delay: '1.8s' },
    { id: 5, x: 'right-8', y: 'bottom-64', size: 'w-6 h-6', color: 'bg-cyan-400/15', delay: '0.7s' },
    { id: 6, x: 'left-32', y: 'bottom-48', size: 'w-8 h-8', color: 'bg-green-400/20', delay: '2.5s' },
    { id: 7, x: 'right-1/3', y: 'bottom-32', size: 'w-3 h-3', color: 'bg-yellow-400/25', delay: '1.5s' },
    { id: 8, x: 'left-1/2', y: 'bottom-16', size: 'w-5 h-5', color: 'bg-orange-400/20', delay: '0.3s' },
    { id: 9, x: 'right-12', y: 'top-1/3', size: 'w-2 h-2', color: 'bg-violet-400/30', delay: '2.8s' },
    { id: 10, x: 'left-12', y: 'top-2/3', size: 'w-6 h-6', color: 'bg-rose-400/15', delay: '1.0s' },
    { id: 11, x: 'right-1/4', y: 'top-1/2', size: 'w-4 h-4', color: 'bg-emerald-400/20', delay: '2.3s' }
  ];
  
  const learningStages = [
    {
      id: 1,
      title: "Analysing Team Skills",
      description: "The right workshops for your team - total beginners, juniors, and senior devs",
      icon: <Brain className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Identifying Biggest Wins",
      description: "Sessions adapted to the best tools and practices for your company",
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 3,
      title: "Connecting Dots",
      description: "Learn to use AI with initiative",
      icon: <Code className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
      ];
  
  // Create random connection when animation completes
  const createRandomConnection = () => {
    const availableDots = interactiveDots.map(dot => dot.id);
    
    // Pick two random dots
    const fromIndex = Math.floor(Math.random() * availableDots.length);
    const fromDot = availableDots[fromIndex];
    availableDots.splice(fromIndex, 1);
    
    const toIndex = Math.floor(Math.random() * availableDots.length);
    const toDot = availableDots[toIndex];
    
    const newConnection = { from: fromDot, to: toDot };
    setConnections(prev => [...prev, newConnection]);
  };

  // Handle dot interactions
  const handleDotClick = (dotId: number) => {
    console.log('handleDotClick called with:', dotId);
    console.log('Current selectedDot:', selectedDot);
    console.log('Current connections:', connections);
    
    if (selectedDot === null) {
      console.log('Selecting dot:', dotId);
      setSelectedDot(dotId);
    } else if (selectedDot === dotId) {
      console.log('Deselecting dot:', dotId);
      setSelectedDot(null);
    } else {
      // Create connection
      const newConnection = { from: selectedDot, to: dotId };
      console.log('Attempting to create connection:', newConnection);
      
      // Check if connection already exists
      const connectionExists = connections.some(
        conn => 
          (conn.from === selectedDot && conn.to === dotId) ||
          (conn.from === dotId && conn.to === selectedDot)
      );
      
      if (!connectionExists) {
        console.log('Creating new connection:', newConnection);
        setConnections(prev => {
          const newConnections = [...prev, newConnection];
          console.log('New connections array:', newConnections);
          return newConnections;
        });
      } else {
        console.log('Connection already exists');
      }
      setSelectedDot(null);
    }
  };



  const skipAnimation = () => {
    setIsAnimationSkipped(true);
    setPromptText(fullPrompt);
    setIsPromptComplete(true);
    setShowCursor(false);
    setIsProcessing(false);
    setCurrentStage(learningStages.length + 1);
    setShowCompletionMessage(true);
    setIsTerminalCollapsed(true);
  };

  // Typing animation for prompt
  useEffect(() => {
    if (isAnimationSkipped) return;
    if (promptText.length < fullPrompt.length) {
      const timeout = setTimeout(() => {
        setPromptText(fullPrompt.substring(0, promptText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (!isPromptComplete) {
      setTimeout(() => {
        setIsPromptComplete(true);
        setShowCursor(false);
        setIsProcessing(true);
      }, 500);
    }
  }, [promptText, fullPrompt, isPromptComplete, isAnimationSkipped]);

  // Cursor blinking
  useEffect(() => {
    if (isAnimationSkipped) return;
    if (!isPromptComplete) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPromptComplete, isAnimationSkipped]);

  // Sequential stage animation
  useEffect(() => {
    if (isAnimationSkipped) return;
    if (isPromptComplete && currentStage <= learningStages.length) {
      const timeout = setTimeout(() => {
        setCurrentStage(prev => prev + 1);
        if (currentStage === 0) {
          setIsProcessing(false);
          // Collapse terminal when learning stages begin
          setTimeout(() => setIsTerminalCollapsed(true), 500);
        }
      }, currentStage === 0 ? 1500 : 1200);
      return () => clearTimeout(timeout);
    } else if (isPromptComplete && currentStage > learningStages.length && !showCompletionMessage) {
      // Show completion message with delay after all stages complete
      const timeout = setTimeout(() => {
        setShowCompletionMessage(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isPromptComplete, currentStage, learningStages.length, showCompletionMessage, isAnimationSkipped]);

  // Create random connections when animation completes
  useEffect(() => {
    if (showCompletionMessage && connections.length === 0) {
      // Add a slight delay before creating connection
      const timeout = setTimeout(() => {
        createRandomConnection();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [showCompletionMessage, connections.length]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      {/* Interactive Dots */}
      {interactiveDots.map((dot) => (
        <button
          key={dot.id}
          ref={(el) => {
            dotRefs.current[dot.id] = el;
          }}
          onClick={() => {
            console.log('Dot clicked:', dot.id);
            handleDotClick(dot.id);
          }}
          onMouseEnter={() => setHoveredDot(dot.id)}
          onMouseLeave={() => setHoveredDot(null)}
          className={`
            absolute ${dot.x} ${dot.y} ${dot.size} ${dot.color} rounded-full z-30
            transition-all duration-300 cursor-pointer hover:scale-150 hover:opacity-80
            ${selectedDot === dot.id ? 'ring-2 ring-primary-400 ring-opacity-60 scale-125' : ''}
            ${hoveredDot === dot.id ? 'animate-pulse' : 'animate-pulse'}
          `}
          style={{ animationDelay: dot.delay }}
          aria-label={`Interactive dot ${dot.id + 1}`}
        />
      ))}
      
                    {/* Connection Lines */}
       <svg className="absolute inset-0 pointer-events-none z-1" style={{ overflow: 'visible' }}>
         {connections.map((connection, index) => {
           const fromEl = dotRefs.current[connection.from];
           const toEl = dotRefs.current[connection.to];
           
           if (!fromEl || !toEl) return null;
           
           const fromRect = fromEl.getBoundingClientRect();
           const toRect = toEl.getBoundingClientRect();
           const containerRect = fromEl.offsetParent?.getBoundingClientRect();
           
           if (!containerRect) return null;
           
           const x1 = fromRect.left - containerRect.left + fromRect.width / 2;
           const y1 = fromRect.top - containerRect.top + fromRect.height / 2;
           const x2 = toRect.left - containerRect.left + toRect.width / 2;
           const y2 = toRect.top - containerRect.top + toRect.height / 2;
           
           return (
             <line
               key={index}
               x1={x1}
               y1={y1}
               x2={x2}
               y2={y2}
               stroke="url(#connectionGradient)"
               strokeWidth="3"
               strokeDasharray="8,4"
               opacity="0.8"
               className="animate-pulse"
               style={{
                 animation: 'fadeIn 2s ease-in-out forwards'
               }}
             />
           );
         })}
         <defs>
           <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
             <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
           </linearGradient>
         </defs>
       </svg>
      
      <div className="relative z-10 min-h-screen flex items-center py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-center text-center space-y-12">
            
            {/* Hero Content */}
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-6">
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Transform Your Team with{' '}<br/>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                    AI-Enhanced{' '}
                  </span>
                  Development
                </h1>
              </div>

              {/* AI Prompt Terminal */}
              <div className={`bg-gray-900 rounded-xl font-mono text-sm shadow-2xl border border-gray-800 text-left transition-all duration-700 ${
                isTerminalCollapsed ? 'p-3' : 'p-6'
              }`}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400 ml-4 text-xs">AI Learning Assistant</span>
                </div>
                
                <div className="space-y-3">
                  <div className="text-gray-400">
                    <span className="text-green-400">user@coefficient:~$</span>{' '}
                    <span className="text-white">
                      {promptText}
                      <span className={`bg-white w-2 h-5 inline-block ml-1 transition-opacity duration-75 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                    </span>
                  </div>
                  
                  <div className={`transition-all duration-700 overflow-hidden ${
                    isTerminalCollapsed ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
                  }`}>
                    {isPromptComplete && (
                      <div className="text-green-400 mt-4">
                        ✓ Prompt received - Analysing requirements...
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
            </div>

            {/* Learning Journey Visualization */}
            <div className="space-y-4 max-w-2xl w-full">
              {learningStages.map((stage, index) => {
                const isVisible = currentStage > index;
                const isActive = currentStage === index + 1;
                
                return (
                  <div key={stage.id} className="relative">
                    {/* Connecting Line */}
                    {index < learningStages.length - 1 && isVisible && currentStage >= index + 2 && (
                      <div className="absolute left-8 top-12 w-0.5 h-10 bg-gradient-to-b from-gray-400 to-gray-200" />
                    )}
                    
                    {/* Stage Card */}
                    <div 
                      className={
                        `flex items-center space-x-3 p-3 rounded-sm border transition-all duration-700 transform ` +
                        (isVisible 
                          ? `${stage.bgColor} ${stage.borderColor} translate-x-0 opacity-100 ` 
                          : 'bg-gray-50 border-gray-200 translate-x-6 opacity-30 ') +
                        (isActive ? 'scale-105 shadow-md' : '')
                      }
                    >
                      {/* Icon */}
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
                        ${isVisible ? stage.bgColor : 'bg-gray-100'}
                        ${isVisible ? 'ring-1 ring-white/50' : ''}
                      `}>
                        <div className={isVisible ? stage.color : 'text-gray-400'}>
                          {stage.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`
                          font-semibold text-base transition-colors duration-500
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
                            <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                            </div>
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-16 flex flex-col items-center gap-6">
            {/* Skip Animation Button */}
            {!showCompletionMessage && !isAnimationSkipped && promptText.length > 0 && (
              <button
                onClick={skipAnimation}
                className="flex items-center space-x-2 text-sm text-gray-500/70 hover:text-gray-700 transition-colors duration-200 group"
              >
                <SkipForward className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>Skip animation</span>
              </button>
            )}
            
            {/* Main CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-opacity duration-500 ${
              showCompletionMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <button 
                onClick={onNavigateToQuestions}
                className="btn-secondary group flex items-center justify-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Get a Quote
              </button>
              <button className="btn-primary group flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero; 