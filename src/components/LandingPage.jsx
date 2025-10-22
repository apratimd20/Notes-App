import React from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, Zap, Shield, Users, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <StickyNote className="h-20 w-20 text-blue-600 relative z-10 animate-bounce" />
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
              Your <span className="text-blue-600">Notes</span>
              <br />
              <span className="text-3xl sm:text-5xl lg:text-6xl">Reimagined</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Capture, organize, and access your thoughts anywhere. 
              <span className="text-blue-600 font-semibold"> Simple, fast, and beautiful.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">Lightning Fast</div>
                <div className="text-gray-600">Instant note saving</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">Secure</div>
                <div className="text-gray-600">Your data is protected</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">Always Available</div>
                <div className="text-gray-600">Access anywhere</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Why Choose <span className="text-blue-600">NOTES</span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Organize Your Thoughts?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust NOTES for their note-taking needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <StickyNote className="h-8 w-8" />,
    title: "Simple Note Taking",
    description: "Clean, distraction-free interface for capturing your thoughts quickly and efficiently."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Instant saving and loading. Your notes are always ready when you need them."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure & Private",
    description: "Your notes are protected and private. We prioritize your data security."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Cross-Platform",
    description: "Access your notes from any device, anywhere. Always in sync."
  },
  {
    icon: <StickyNote className="h-8 w-8" />,
    title: "Organized",
    description: "Easy categorization and search to find exactly what you need, when you need it."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Always Free",
    description: "No hidden costs. Enjoy all features without any subscription fees."
  }
];

export default LandingPage;