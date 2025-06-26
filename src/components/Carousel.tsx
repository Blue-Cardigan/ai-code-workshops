import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialCarouselProps {
  testimonials: Array<{
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
  }>;
}

interface ClientCarouselProps {
  clients: string[];
}

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-neutral-600">
            Real feedback from professionals who transformed their careers
          </p>
        </div>

        <div className="carousel-container relative">
          <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="carousel-slide">
                <div className="testimonial-card max-w-4xl mx-auto">
                  <div className="flex items-start space-x-4 mb-6">
                    <Quote className="w-8 h-8 text-primary-500 flex-shrink-0 mt-1" />
                    <p className="text-lg text-neutral-700 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
                        <p className="text-neutral-600">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-600 hover:text-primary-600 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-600 hover:text-primary-600 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ClientCarousel = ({ clients }: ClientCarouselProps) => {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center my-12">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-neutral-600">
            Join hundreds of organisations that have transformed their development practices
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-slide-infinite">
            {/* First set */}
            {clients.map((client, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-8">
                <img 
                  src={client} 
                  alt={`Client ${index + 1}`}
                  className="h-12 w-auto client-logo"
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-8">
                <img 
                  src={client} 
                  alt={`Client ${index + 1}`}
                  className="h-12 w-auto client-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Sample data for testimonials
export const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "TechCorp",
    content: "The AI-assisted development course completely transformed how I approach coding. I'm now 3x more productive and my code quality has improved dramatically.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9b5b122?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "InnovateLabs",
    content: "As a non-technical PM, this course gave me the confidence to contribute to technical discussions and understand our development workflow much better.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Data Scientist",
    company: "DataDriven Inc",
    content: "The hands-on approach and real-world projects made all the difference. I went from struggling with deployment to confidently shipping ML models to production.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
]; 