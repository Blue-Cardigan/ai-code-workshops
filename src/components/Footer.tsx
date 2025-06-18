import React from 'react';
import { Brain, Mail, Github, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      alert(`🎉 Successfully subscribed!\n\nEmail: ${email}\n\nThank you for subscribing to AI Code Academy updates. You'll receive the latest news on AI development tools and workshop announcements.`);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleSocialClick = (platform: string) => {
    alert(`🔗 Redirecting to ${platform}...\n\nFollow us for the latest updates!`);
  };

  const handleGetStarted = () => {
    scrollToSection('workshops');
  };

  const handleScheduleDemo = () => {
    alert(`📅 Schedule a Demo\n\nOur team will contact you within 24 hours to schedule a personalized demo of our AI-powered coding workshops.\n\nWhat you'll get:\n• Custom workshop recommendations\n• Live demonstration of AI tools\n• Q&A with our instructors\n• Special enrollment offers`);
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-100" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div 
                className="flex items-center space-x-3 mb-6 cursor-pointer" 
                onClick={() => scrollToSection('home')}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-md flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">AI Code Academy</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                Transforming how developers learn and work with AI-powered tools. 
                From zero-to-one coding to advanced engineering practices.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleSocialClick('GitHub')}
                  className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <Github className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Twitter')}
                  className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <Twitter className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => handleSocialClick('LinkedIn')}
                  className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('workshops')} 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    Workshops
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('tracks')} 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    Learning Tracks
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => alert('📞 Contact Us\n\nEmail: hello@aicodeacademy.com\nPhone: +1 (555) 123-4567\nOffice Hours: Mon-Fri 9AM-6PM PST')} 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => alert('💰 Pricing\n\nIndividual Workshops: $299 each\nLearning Tracks: $899-$1299\nEnterprise Training: Custom pricing\n\n🎁 Special Launch Offer: 20% off all courses!')} 
                    className="text-gray-600 hover:text-gray-900 transition-colors text-left"
                  >
                    Pricing
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Stay Updated</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Get the latest news on AI development tools and workshop announcements.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button 
                  type="submit"
                  disabled={isSubscribed}
                  className={`flex items-center justify-center space-x-2 ${
                    isSubscribed 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-pink-600 hover:bg-pink-700'
                  } text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed`}
                >
                  <Mail className="h-4 w-4" />
                  <span>{isSubscribed ? 'Subscribed!' : 'Subscribe'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 AI Code Academy. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button 
                onClick={() => alert('🔒 Privacy Policy\n\nWe respect your privacy and protect your personal information. View our full privacy policy on our website.')} 
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => alert('📋 Terms of Service\n\nBy using our services, you agree to our terms and conditions. View the complete terms on our website.')} 
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => alert('🍪 Cookie Policy\n\nWe use cookies to enhance your experience. Learn more about our cookie usage policy.')} 
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-gray-200 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to start your AI-powered coding journey?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI to supercharge their coding skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleGetStarted}
                className="btn-primary flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={handleScheduleDemo}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 