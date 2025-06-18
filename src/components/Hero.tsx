import React from 'react';
import Button from './Button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/veg.jpg)' }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col pt-20">
        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                How can AI solve your coding challenges?
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed max-w-xl">
                Coefficient is a data consultancy offering end-to-end 
            workshops in AI-assisted development, from zero-to-one coding 
            to advanced engineering practices, as well as bespoke 
            training courses.
              </p>

              {/* Contact Button */}
              <Button>
                CONTACT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 