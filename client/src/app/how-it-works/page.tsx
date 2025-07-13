'use client';

import Link from 'next/link';
import { Search, Calendar, Shield, Star, Plus, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Post Your Project',
      description: 'Describe your home improvement needs, set your budget, and specify your timeline. Our smart system will help you create a detailed project brief.',
      icon: Plus,
      color: 'primary'
    },
    {
      step: '02',
      title: 'Get Matched',
      description: 'Receive proposals from qualified professionals in your area. Review profiles, portfolios, and customer reviews to find the perfect match.',
      icon: Users,
      color: 'accent'
    },
    {
      step: '03',
      title: 'Hire & Collaborate',
      description: 'Choose your professional and start working together. Use our platform to communicate, track progress, and manage payments securely.',
      icon: Calendar,
      color: 'success'
    },
    {
      step: '04',
      title: 'Review & Enjoy',
      description: 'Once your project is complete, leave a review to help other homeowners. Enjoy your beautifully improved home!',
      icon: Star,
      color: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-dark-900 mb-6">
              How A-List Home Pros Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From project posting to completion, we make it simple to connect with trusted professionals 
              and get your home improvement projects done right.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className={`p-4 bg-${step.color}-100 rounded-2xl mr-4`}>
                    <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                  </div>
                  <div className={`text-6xl font-bold text-${step.color}-200`}>
                    {step.step}
                  </div>
                </div>
                <h2 className="font-heading font-bold text-3xl lg:text-4xl text-dark-900 mb-6">
                  {step.title}
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 h-80 flex items-center justify-center">
                  <p className="text-gray-400 text-lg">Step {step.step} Illustration</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-dark-900 mb-6">
              Why Choose A-List Home Pros?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the most trusted platform for home improvement projects with features that protect and empower both homeowners and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Professionals',
                description: 'Every professional is background-checked, licensed, and insured for your peace of mind.'
              },
              {
                icon: CheckCircle,
                title: 'Secure Payments',
                description: 'Protected payment system with escrow services ensures safe transactions for everyone.'
              },
              {
                icon: Star,
                title: 'Quality Guarantee',
                description: 'Our satisfaction guarantee and review system ensures you get the quality you deserve.'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="p-4 bg-primary-100 rounded-2xl w-fit mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-dark-900 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied homeowners who have completed successful projects through A-List Home Pros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/post-project"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Post Your Project</span>
              </Link>
              <Link
                href="/professionals"
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Browse Professionals</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 