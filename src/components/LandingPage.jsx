import React from 'react';
import { Link } from 'react-router-dom';
import { StickyNote, Zap, Shield, Users, ArrowRight, CheckCircle, Cloud, Lock, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20"></div>
              <StickyNote className="h-8 w-8 text-blue-600 relative z-10" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              NOTES
            </span>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-6 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-8">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Trusted by 10,000+ professionals</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Organize Your
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Thoughts
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              The modern note-taking platform designed for professionals. 
              <span className="font-medium text-gray-700"> Secure, fast, and beautifully simple.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                Watch Demo
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Built for <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Productivity</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Everything you need to capture ideas, organize thoughts, and boost your productivity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                    <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 mb-8 shadow-lg">
            <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">Ready to get started?</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Note-Taking Experience
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
            Join professionals worldwide who trust NOTES to organize their ideas and boost productivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/enterprise"
              className="group text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:text-blue-600 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
            >
              Enterprise Solution
            </Link>
          </div>
          
          <p className="text-gray-500 text-sm mt-6">
            No credit card required • Free 14-day trial • Setup in minutes
          </p>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and compliance standards to keep your data safe and secure at all times."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Lightning Fast Performance",
    description: "Instant search and real-time synchronization across all your devices with zero latency."
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Seamless Collaboration",
    description: "Share notes securely with team members and collaborate in real-time with version history."
  },
  {
    icon: <StickyNote className="h-6 w-6" />,
    title: "Smart Organization",
    description: "AI-powered tagging and categorization to keep your notes perfectly organized and searchable."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Workspaces",
    description: "Create shared workspaces for your team with granular permissions and access controls."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "GDPR Compliant",
    description: "Fully compliant with global data protection regulations. Your privacy is our priority."
  }
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "2M+", label: "Notes Created" },
  { value: "150+", label: "Countries" }
];

export default LandingPage;