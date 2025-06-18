import React from 'react';
import { Mail, Github, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`🎉 Successfully subscribed!\n\nEmail: ${email}\n\nThank you for subscribing to Coefficient updates.`);
      setEmail('');
    }
  };

  const handleSocialClick = (platform: string) => {
    alert(`🔗 Redirecting to ${platform}...`);
  };

  return (
    <footer className="bg-white py-16" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Links Column */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Links</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  About
                </a>
                <span className="text-gray-700">|</span>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Services
                </a>
              </div>
              <div className="flex items-center space-x-1">
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Training
                </a>
                <span className="text-gray-700">|</span>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Team
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Careers
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Privacy Policy
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Modern Slavery Statement
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Cyber Essential Plus Certification
                </a>
              </div>
              <div>
                <a href="#" className="text-gray-700 hover:text-gray-900 border-b border-gray-700 hover:border-gray-900 transition-colors">
                  Carbon Reduction Plan
                </a>
              </div>
            </div>
          </div>

          {/* Subscribe Column */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Subscribe</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Sign up with your email address to receive news and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-500"
              />
              <Button type="submit">
                SIGN UP
              </Button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
              We respect your privacy.
            </p>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-right">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact</h3>
            <div className="space-y-4 text-gray-700">
              <p className="font-semibold">Coefficient Systems Ltd.</p>
              <p>85 Great Portland Street,</p>
              <p>W1W 7LT, London,</p>
              <p>United Kingdom</p>
              <p className="mt-6">
                <a href="mailto:contact@coefficient.ai" className="hover:text-gray-900 transition-colors">
                  contact@coefficient.ai
                </a>
              </p>
              <p className="mt-6">Company Number: 11331912</p>
              
              {/* Social Icons */}
              <div className="flex justify-center md:justify-end space-x-3 mt-8">
                <button 
                  onClick={() => handleSocialClick('Email')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Mail className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Twitter')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Twitter className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Facebook')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Facebook className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleSocialClick('Instagram')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Instagram className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleSocialClick('LinkedIn')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Linkedin className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleSocialClick('GitHub')}
                  className="p-2 hover:bg-gray-100 transition-colors"
                  style={{ color: '#ff6f68' }}
                >
                  <Github className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Logos and Copyright Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/61dcb05c-22b6-4506-ba65-a5de653ca5ba/Tech+Zero+.png" 
              alt="Tech Zero" 
              className="h-16 object-contain"
            />
            <div className="text-center">
              <img 
                src="https://images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/52c47025-c61d-4a96-b481-fc6e5868afb9/Supercritical.png" 
                alt="Supercritical" 
                className="h-12 object-contain mb-2"
              />
              <p className="text-sm text-gray-600 italic">Coefficient emitted 8 tonnes of CO2 in 2021</p>
            </div>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/941743a8-ae4b-4f6b-be84-a557ebb133cf/JOSCAR+PNG+Format.png" 
              alt="JOSCAR Registered" 
              className="h-16 object-contain"
            />
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/cbe3e3bc-238a-4d6a-8627-26cbffe5d2f1/Cyber-Essentials-Logo-v2.png" 
              alt="Cyber Essentials Certified" 
              className="h-16 object-contain"
            />
            <img 
              src="https://images.squarespace-cdn.com/content/v1/5ba26f9d89c1720405dcfae2/79892248-53fe-4214-b157-53bf38ea54c5/cyberessentials_certification-mark-plus_colour.png" 
              alt="Cyber Essentials Plus Certified" 
              className="h-16 object-contain"
            />
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm">
            © 2025 Coefficient Systems Ltd. All rights reserved. Made with ♥ in London & Bristol.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer; 