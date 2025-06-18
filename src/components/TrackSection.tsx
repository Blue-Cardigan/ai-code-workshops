import React from 'react';
import { ArrowRight, Users, Database, Code } from 'lucide-react';
import Button from './Button';

interface TrackSectionProps {
  onNavigateToAssessment?: () => void;
}

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

const TrackSection = ({ onNavigateToAssessment }: TrackSectionProps) => {
  const [, ] = React.useState<number[]>([]);

  const handleTakeAssessment = () => {
    if (onNavigateToAssessment) {
      onNavigateToAssessment();
    } else {
      // Fallback for when no navigation function is provided
      const questions = [
        "What's your current coding experience level?",
        "Which tools do you currently use?",
        "What are your learning goals?",
        "Do you have any AI development experience?"
      ];
      
      alert(`🎯 Skill Assessment\n\nThis assessment will help us recommend the perfect learning track for you.\n\nQuestions include:\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}\n\nStarting assessment...`);
    }
  };

  const handleScheduleCall = () => {
    window.open('https://calendly.com/johnsandall/20-minute-discovery-call-clone?month=2025-06', '_blank');
  };

  return (
    <section id="tracks" className="py-20" style={{ backgroundColor: '#fcf7f7' }}>
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
            
            return (
              <div
                key={track.id}
                className={`card p-6 ${colors.bg}`}
              >
                {/* Track Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.icon} rounded-lg mb-4`}>
                  {track.icon}
                </div>

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

              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Not sure which track is right for your team?
            </h3>
            <p className="text-gray-600 mb-6">
              Take our quick assessment to get personalised recommendations based on your current skills and goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleTakeAssessment}
                className="flex items-center space-x-2"
              >
                <span>Take Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleScheduleCall}
                variant="secondary"
              >
                Schedule a call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackSection; 