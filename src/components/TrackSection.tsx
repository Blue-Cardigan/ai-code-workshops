import React from 'react';
import { ArrowRight, Users, Target, Briefcase, Database, Code, Zap } from 'lucide-react';

interface Track {
  id: number;
  title: string;
  description: string;
  workshops: string[];
  icon: React.ReactNode;
  color: string;
  audience: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "New to Coding Track",
    description: "Perfect for complete beginners and those new to programming",
    workshops: ["Intro to Vibe Coding", "Prompt Engineering for Power Users", "Git & GitHub for Beginners"],
    icon: <Users className="h-6 w-6" />,
    color: "green",
    audience: "Complete beginners, non-technical professionals"
  },
  {
    id: 2,
    title: "AI-Augmented Engineer Track",
    description: "Level up your development skills with AI-powered tools and workflows",
    workshops: ["Refactor Like a Pro", "Testing in the Age of Copilot", "PromptOps", "Cursor + Claude + GitHub"],
    icon: <Code className="h-6 w-6" />,
    color: "blue",
    audience: "Junior to mid-level developers"
  },
  {
    id: 3,
    title: "ML Engineer to AI Dev Track",
    description: "Transition from traditional ML to modern AI development practices",
    workshops: ["AI-Assisted Notebooks", "Fine-Tuning the Vibes", "AI Debugging"],
    icon: <Database className="h-6 w-6" />,
    color: "red",
    audience: "ML engineers, data scientists"
  },
  {
    id: 4,
    title: "Frontend Focus Track",
    description: "Build modern frontends with AI assistance and best practices",
    workshops: ["Intro to Vibe Coding", "From Playground to Production", "Cursor + Claude + GitHub"],
    icon: <Zap className="h-6 w-6" />,
    color: "purple",
    audience: "Frontend developers, UI/UX designers"
  },
  {
    id: 5,
    title: "Backend Focus Track",
    description: "Master backend development with AI tools and DevOps practices",
    workshops: ["Git & GitHub for Beginners", "Testing in the Age of Copilot", "Cursor + Claude + GitHub", "Secure by Design"],
    icon: <Target className="h-6 w-6" />,
    color: "coral",
    audience: "Backend developers, DevOps engineers"
  },
  {
    id: 6,
    title: "PromptOps / AI PM Focus",
    description: "Product management and operations for AI-powered products",
    workshops: ["Prompt Engineering for Power Users", "PromptOps", "AI Debugging"],
    icon: <Briefcase className="h-6 w-6" />,
    color: "yellow",
    audience: "Product managers, AI operations teams"
  }
];

const getTrackColors = (color: string) => {
  const colors = {
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-100 text-green-600',
      button: 'bg-green-600 hover:bg-green-700'
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-100 text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'bg-red-100 text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-100 text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700'
    },
    coral: {
      bg: 'bg-pink-50',
      icon: 'bg-pink-100 text-pink-600',
      button: 'bg-pink-600 hover:bg-pink-700'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'bg-yellow-100 text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700'
    }
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

const TrackSection = () => {
  const [enrolledTracks, setEnrolledTracks] = React.useState<number[]>([]);

  const handleStartTrack = (track: Track) => {
    if (enrolledTracks.includes(track.id)) {
      alert(`📚 Continue ${track.title}\n\nYou're already enrolled in this track. Redirecting to your progress...`);
    } else {
      setEnrolledTracks([...enrolledTracks, track.id]);
      alert(`🚀 Starting ${track.title}!\n\n✅ Enrolled successfully\n🎯 Target audience: ${track.audience}\n📋 Workshops included: ${track.workshops.length}\n\nYou can now access all workshops in this track!`);
    }
  };

  const handleTakeAssessment = () => {
    // Simulate a skill assessment
    const questions = [
      "What's your current coding experience level?",
      "Which tools do you currently use?",
      "What are your learning goals?",
      "Do you have any AI development experience?"
    ];
    
    alert(`🎯 Skill Assessment\n\nThis assessment will help us recommend the perfect learning track for you.\n\nQuestions include:\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nStarting assessment...`);
  };

  const handleBrowseWorkshops = () => {
    const workshopsSection = document.getElementById('workshops');
    if (workshopsSection) {
      workshopsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tracks" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learning Tracks
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Structured learning paths that guide you from beginner to expert. 
            Choose your track based on your current skills and career goals.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tracks.map((track) => {
            const colors = getTrackColors(track.color);
            const isEnrolled = enrolledTracks.includes(track.id);
            
            return (
              <div
                key={track.id}
                className={`card p-6 ${colors.bg}`}
              >
                {/* Track Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.icon} rounded-lg mb-4`}>
                  {track.icon}
                </div>

                {/* Enrollment Status */}
                {isEnrolled && (
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      ✅ Enrolled
                    </span>
                  </div>
                )}

                {/* Track Header */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {track.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {track.description}
                </p>

                {/* Target Audience */}
                <div className="mb-4">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Users className="h-3 w-3 mr-1" />
                    Target Audience
                  </div>
                  <p className="text-sm text-gray-700">{track.audience}</p>
                </div>

                {/* Workshop List */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Included Workshops:</h4>
                  <div className="space-y-1">
                    {track.workshops.map((workshop, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600 leading-relaxed">{workshop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>{track.workshops.length} workshops</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`${isEnrolled ? 'bg-green-500' : 'bg-gray-300'} h-1.5 rounded-full transition-all duration-500`}
                      style={{ width: isEnrolled ? '25%' : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => handleStartTrack(track)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{isEnrolled ? 'Continue Track' : 'Start Track'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Not sure which track is right for you?
            </h3>
            <p className="text-gray-600 mb-6">
              Take our quick assessment to get personalized recommendations based on your current skills and goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleTakeAssessment}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Take Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={handleBrowseWorkshops}
                className="btn-secondary"
              >
                Browse All Workshops
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackSection; 