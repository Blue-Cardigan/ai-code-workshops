import { TrendingUp, Target, Users, AlertCircle } from 'lucide-react';

const MarketStats = () => {
  return (
    <div style={{ overflowX: 'clip' }}>
      <section className="relative">
        {/* Tilted background container - extended beyond section bounds */}
        <div 
          className="absolute transform -rotate-3" 
          style={{ 
            backgroundColor: '#1e40af',
            width: '150%',
            height: '120%',
            top: '-15%',
            left: '-25%'
          }}
        ></div>
      
        {/* Straight grid overlay */}
        <div 
          className="absolute" 
          style={{ 
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            width: '100%',
            height: '130%',
            top: '-20%',
            left: '0'
          }}
        ></div>
        
        <div className="relative z-10 container-wide">
          {/* Main heading spanning full width */}
          <h2 className="text-7xl md:text-8xl font-bold leading-tight text-white mb-12 pt-8 text-left">
            Your Team Needs This.
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[60vh]">
            
            {/* Left side - Explanatory text */}
            <div className="text-white space-y-6">
              <div className="text-2xl md:text-3xl leading-relaxed font-bold space-y-4 opacity-80">
                <p>
                  The AI skills gap is widening faster than companies can close it.
                </p>
              </div>
                
              <div className="text-xl leading-relaxed space-y-4">
                <p>
                  While 92% of companies plan to increase AI investment, 68% cite skills shortage as their primary barrier to implementation.
                </p>
                
                <p className="text-white/90 font-medium">
                  With us, your teams build their own solutions, clear their biggest blockers, and love getting things done.
                </p>
              </div>
              
              {/* Competitive Advantages */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-md p-4 border border-white/20">
                  <div className="text-lg font-bold text-white mb-2">
                    ✓ Hands-On
                  </div>
                  <div className="text-white/90 text-sm">
                    Build real applications, not just learn concepts
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-md p-4 border border-white/20">
                  <div className="text-lg font-bold text-white mb-2">
                    ✓ Department-Specific
                  </div>
                  <div className="text-white/90 text-sm">
                    Tailored scenarios for your department and use cases
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-md p-4 border border-white/20">
                  <div className="text-lg font-bold text-white mb-2">
                    ✓ Post-training Support
                  </div>
                  <div className="text-white/90 text-sm">
                    Post-training guidance for real-world use
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-md p-4 border border-white/20">
                  <div className="text-lg font-bold text-white mb-2">
                    ✓ Measurable Outcomes
                  </div>
                  <div className="text-white/90 text-sm">
                    Track ROI and productivity improvements
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Compact stat components */}
            <div className="grid grid-cols-2 gap-6">
              {/* Skills Gap - Circular Progress */}
              <div className="group">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="text-red-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="w-8 h-8 relative">
                    <div className="w-full h-full rounded-full border-2 border-red-200"></div>
                    <div className="absolute inset-0 w-full h-full rounded-full border-2 border-red-400 border-t-transparent animate-spin"></div>
                  </div>
                </div>
                <div className="text-7xl font-black text-red-400 leading-none mb-3">
                  114%
                </div>
                <div className="text-base font-bold text-white/90 mb-1">
                  Skills Gap Increase
                </div>
                <div className="text-sm text-white/70 mb-2">
                  Critical shortage in 18 months
                </div>
                <div className="text-xs text-white/60 font-medium">
                  Source: TechRepublic
                </div>
              </div>

              {/* Organisations Using AI - Bar Chart Style */}
              <div className="group">
                <div className="text-blue-400 mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-7xl font-black text-blue-400 leading-none mb-3">
                  78%
                </div>
                <div className="text-base font-bold text-white/90 mb-2">
                  Organisations Using AI
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center">
                    <div className="w-16 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                    <span className="text-sm text-white/70">Using AI</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-1.5 bg-white/30 rounded-full mr-3"></div>
                    <span className="text-sm text-white/70">Training</span>
                  </div>
                </div>
                <div className="text-xs text-white/60 font-medium">
                  Source: McKinsey & Company
                </div>
              </div>

              {/* Skills Barrier - Warning Style */}
              <div className="group">
                <div className="text-orange-400 mb-3">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-7xl font-black text-orange-400 leading-none mb-3">
                  68%
                </div>
                <div className="text-base font-bold text-white/90 mb-1">
                  Cite Skills as Barrier
                </div>
                <div className="text-sm text-white/70 mb-3">
                  Primary implementation blocker
                </div>
                <div className="flex space-x-1 mb-3">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-3 w-1.5 rounded ${i < 7 ? 'bg-orange-400' : 'bg-white/30'}`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-white/60 font-medium">
                  Source: IT Brief UK
                </div>
              </div>

              {/* Investment Plans - Growth Arrow */}
              <div className="group">
                <div className="text-green-400 mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-7xl font-black text-green-400 leading-none mb-3">
                  92%
                </div>
                <div className="text-base font-bold text-white/90 mb-1">
                  Plan AI Investment
                </div>
                <div className="text-sm text-white/70 mb-3">
                  But lack skills to execute
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-4 h-1 bg-green-400 rounded"></div>
                  <div className="w-3 h-1 bg-green-400 rounded"></div>
                  <div className="w-2 h-1 bg-green-400 rounded"></div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-xs text-white/60 font-medium">
                  Source: McKinsey & Company
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketStats; 