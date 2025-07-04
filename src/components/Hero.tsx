import { useState, useEffect, useRef } from 'react';
import { Calendar, MessageSquare, ArrowRight, SkipForward, Users, TrendingUp, Award } from 'lucide-react';

interface HeroProps {
  onNavigateToQuestions?: () => void;
}

const Hero = ({ onNavigateToQuestions }: HeroProps) => {
  const [promptText, setPromptText] = useState('');
  const [isPromptComplete, setIsPromptComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [isAnimationSkipped, setIsAnimationSkipped] = useState(false);
  const [isTerminalCollapsed, setIsTerminalCollapsed] = useState(false);
  
  // Interactive dots state - desktop only
  const [connections, setConnections] = useState<Array<{from: number, to: number}>>([]);
  const [selectedDot, setSelectedDot] = useState<number | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const dotRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  
  const prompts = [
    "Use AI to take my team to the next level.",
    "Automate our department processes without waiting for IT.",
    "Build custom tools to streamline our workflows.",
    "Create AI solutions that boost team productivity.",
    "Transform our team into self-sufficient problem solvers.",
    "Empower my team with coding and AI skills."
  ];
  
  const fullPrompt = useRef(prompts[Math.floor(Math.random() * prompts.length)]);
  
  // Interactive dots configuration - desktop only
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
  
  // Handle dot interactions
  const handleDotClick = (dotId: number) => {
    if (selectedDot === null) {
      setSelectedDot(dotId);
    } else if (selectedDot === dotId) {
      setSelectedDot(null);
    } else {
      const newConnection = { from: selectedDot, to: dotId };
      const connectionExists = connections.some(
        conn => 
          (conn.from === selectedDot && conn.to === dotId) ||
          (conn.from === dotId && conn.to === selectedDot)
      );
      
      if (!connectionExists) {
        setConnections(prev => [...prev, newConnection]);
      }
      setSelectedDot(null);
    }
  };

  const skipAnimation = () => {
    setIsAnimationSkipped(true);
    setPromptText(fullPrompt.current);
    setIsPromptComplete(true);
    setShowCursor(false);
    setIsProcessing(false);
    setShowCompletionMessage(true);
    setIsTerminalCollapsed(true);
  };

  // Typing animation for prompt
  useEffect(() => {
    if (isAnimationSkipped) return;
    if (promptText.length < fullPrompt.current.length) {
      const timeout = setTimeout(() => {
        setPromptText(fullPrompt.current.substring(0, promptText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else if (!isPromptComplete) {
      setTimeout(() => {
        setIsPromptComplete(true);
        setShowCursor(false);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setShowCompletionMessage(true);
          setIsTerminalCollapsed(true);
        }, 1500);
      }, 500);
    }
  }, [promptText, isPromptComplete, isAnimationSkipped]);

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

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-64 sm:pt-24 sm:pb-16">

      {/* Social Proof Banner - Simplified for mobile */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* Desktop: Static layout */}
          <div className="hidden lg:flex items-center justify-center space-x-4 text-sm font-medium">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>50+ London departments</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>80% reduction in IT tickets</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>500+ non-technical staff trained</span>
            </div>
          </div>
          
          {/* Mobile/Tablet: Single centered message */}
          <div className="lg:hidden text-xs font-medium">
            <div className="flex items-center justify-center space-x-1">
              <Award className="w-3 h-3" />
              <span>50+ departments • 500+ staff trained</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dots - Desktop only */}
      <div className="hidden lg:block">
        {interactiveDots.map((dot) => (
          <button
            key={dot.id}
            ref={(el) => {
              dotRefs.current[dot.id] = el;
            }}
            onClick={() => handleDotClick(dot.id)}
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
      </div>
      
      {/* Connection Lines - Desktop only */}
       <div className="hidden lg:block">
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
       </div>
      
      <div className="relative z-10 min-h-screen flex items-center py-4">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
            
            {/* Hero Content */}
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              
              {/* Main Heading - Simplified for mobile */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Train <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Pilots
                </span> for<br className="sm:hidden"/>
                <span className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {' '}Self-Service Problem-Solving
                </span>
              </h1>

              {/* Value Proposition - Shorter for mobile */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                <span className="hidden sm:inline">Take your team to the next level with hands-on workshops that turn staff into problem-solvers, and engineers into astronauts.</span>
                <span className="sm:hidden">Hands-on workshops that turn your staff into problem-solvers and engineers into astronauts.</span>
              </p>

              {/* Key Benefits - Simplified for mobile */}
              <div className="flex justify-center items-center gap-3 sm:gap-6 mt-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">45%</div>
                  <div className="text-xs text-gray-600">Faster adoption</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">4hrs</div>
                  <div className="text-xs text-gray-600">Per workshop</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-purple-600">£4k+</div>
                  <div className="text-xs text-gray-600">Per person</div>
                </div>
              </div>

              {/* AI Prompt Terminal - Simplified for mobile */}
              <div className={`relative bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 rounded-lg font-mono text-xs sm:text-sm shadow-lg border border-purple-200 text-left transition-all duration-700 overflow-hidden group mx-2 sm:mx-0 ${
                isTerminalCollapsed ? 'p-3 sm:p-4' : 'p-3 sm:p-4'
              }`}>
                
                {/* Terminal Header - Simplified */}
                <div className="flex items-center space-x-2 mb-3 relative z-10">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-purple-600 font-medium ml-2 text-xs hidden sm:inline">✨ Automation Assistant</span>
                </div>
                
                <div className="space-y-2 relative z-10">
                  <div className="text-purple-700">
                    <span className="text-emerald-600 font-bold">user@coefficient:~$</span>{' '}
                    <span className="text-indigo-800 font-medium break-words">
                      {promptText}
                      <span className={`bg-gradient-to-r from-pink-500 to-purple-500 w-2 h-4 inline-block ml-1 transition-opacity duration-75 rounded-sm ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                    </span>
                  </div>
                  
                  {/* Processing States - Simplified */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    isTerminalCollapsed ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
                  }`}>
                    {isPromptComplete && !isProcessing && (
                      <div className="text-emerald-600 mt-2 flex items-center space-x-2">
                        <span>✨</span>
                        <span className="font-medium text-xs">Analysing requirements...</span>
                      </div>
                    )}
                    
                    {isProcessing && (
                      <div className="flex items-center space-x-2 text-blue-600 mt-2">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="font-medium text-xs">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons - Streamlined for mobile */}
          <div className="mt-6 sm:mt-12 flex flex-col items-center gap-3 sm:gap-4">
            {/* Skip Animation Button */}
            {!showCompletionMessage && !isAnimationSkipped && promptText.length > 0 && (
              <button
                onClick={skipAnimation}
                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <SkipForward className="w-4 h-4" />
                <span>Skip animation</span>
              </button>
            )}
            
            {/* Main CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 justify-center w-full max-w-sm sm:max-w-none transition-opacity duration-500 ${
              showCompletionMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
              <button 
                onClick={onNavigateToQuestions}
                className="btn-primary group flex items-center justify-center relative overflow-hidden border-0 w-full sm:w-auto min-h-[48px] text-center"
              >
                <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline text-nowrap">Readiness Assessment</span>
                <span className="sm:hidden text-sm leading-tight">Assessment</span>
                <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                {/* Urgency indicator */}
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-0 rounded-bl-lg">
                  FREE
                </div>
              </button>
              <button className="btn-secondary group flex items-center justify-center w-full sm:w-auto min-h-[48px]">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Discovery Call</span>
              </button>
            </div>

            {/* Trust Indicators - Simplified */}
            <div className="text-center text-xs text-gray-500 mt-3">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3">
                <span>✓ No obligation</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Custom plans</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Immediate results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;