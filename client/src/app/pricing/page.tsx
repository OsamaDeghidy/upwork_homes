'use client';

import Link from 'next/link';
import { CheckCircle, Star, Crown, Zap, Shield, Phone, Home, Users, Settings } from 'lucide-react';

export default function PricingPage() {
  const subscriptionPlans = [
    {
      category: 'Home Pro',
      description: 'For professional home service providers',
      icon: Home,
      color: 'primary',
      plans: [
        {
          name: 'Basic',
          price: '$150',
          period: '/month',
          description: 'Essential tools for growing professionals',
          features: [
            'Access to project proposals',
            'Basic hiring capabilities',
            'Customer rating system',
            'Basic marketing tools',
            'Email support',
            'Mobile app access',
            'Payment processing'
          ],
          buttonText: 'Start Basic Plan',
          buttonClass: 'bg-primary-500 text-white hover:bg-primary-600',
          stripeId: 'price_home_pro_basic'
        },
        {
          name: 'Premium',
          price: '$275',
          period: '/month',
          description: 'Complete solution for established professionals',
          features: [
            'All Basic features',
            'Priority customer support',
            'Advanced marketing toolkit',
            'Featured profile listing',
            'Custom portfolio builder',
            'Lead generation tools',
            'Advanced analytics',
            'Team management',
            'White-label options'
          ],
          buttonText: 'Start Premium Plan',
          buttonClass: 'bg-primary-600 text-white hover:bg-primary-700',
          popular: true,
          stripeId: 'price_home_pro_premium'
        }
      ]
    },
    {
      category: 'Crew Member',
      description: 'For skilled workers and crew members',
      icon: Users,
      color: 'accent',
      plans: [
        {
          name: 'Basic',
          price: '$90',
          period: '/month',
          description: 'Perfect for individual crew members',
          features: [
            'On-demand hiring access',
            'Basic crew directory listing',
            'Work portfolio upload',
            'Basic messaging system',
            'Payment processing',
            'Mobile app access',
            'Skill verification badges'
          ],
          buttonText: 'Join as Crew Member',
          buttonClass: 'bg-accent-500 text-white hover:bg-accent-600',
          stripeId: 'price_crew_member_basic'
        },
        {
          name: 'Premium',
          price: '$210',
          period: '/month',
          description: 'Enhanced visibility and premium features',
          features: [
            'All Basic features',
            'Priority hiring placement',
            'Featured crew directory listing',
            'Advanced portfolio tools',
            'Direct client messaging',
            'Premium support',
            'Advanced skill certifications',
            'Earnings analytics',
            'Team collaboration tools'
          ],
          buttonText: 'Go Premium',
          buttonClass: 'bg-accent-600 text-white hover:bg-accent-700',
          popular: true,
          stripeId: 'price_crew_member_premium'
        }
      ]
    },
    {
      category: 'Specialist',
      description: 'For project coordinators and specialists',
      icon: Settings,
      color: 'secondary',
      plans: [
        {
          name: 'Flat Rate',
          price: '$60',
          period: '/month',
          description: 'Comprehensive project management solution',
          features: [
            'Full project management suite',
            'Task coordination tools',
            'Progress reporting system',
            'Access to all user roles',
            'Team communication hub',
            'Resource allocation tools',
            'Client relationship management',
            'Advanced scheduling',
            'Custom workflow builder',
            'Integration capabilities'
          ],
          buttonText: 'Become a Specialist',
          buttonClass: 'bg-secondary-500 text-white hover:bg-secondary-600',
          stripeId: 'price_specialist_flat'
        }
      ]
    }
  ];

  const handleSubscription = (stripeId: string) => {
    // Integrate with Stripe subscription logic
    console.log('Subscribing to:', stripeId);
    // This would redirect to Stripe checkout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              Professional Subscription Plans
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the perfect subscription plan for your professional needs. All plans include Stripe integration and no hidden fees.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <Shield className="h-5 w-5" />
              <span>Secure payments powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {subscriptionPlans.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-20">
            {/* Category Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <div className={`p-3 rounded-full bg-${category.color}-100 mr-4`}>
                  <category.icon className={`h-8 w-8 text-${category.color}-600`} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-3xl text-dark-900 mb-2">
                    {category.category}
                  </h2>
                  <p className="text-gray-600 text-lg">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Plans Grid */}
            <div className={`grid gap-8 ${category.plans.length === 1 ? 'max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'}`}>
              {category.plans.map((plan, planIndex) => (
                <div key={planIndex} className={`relative bg-white rounded-2xl shadow-lg border ${plan.popular ? `border-${category.color}-500 transform scale-105` : 'border-gray-200'} p-8`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`bg-${category.color}-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center`}>
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="font-heading font-bold text-2xl text-dark-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-dark-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleSubscription(plan.stripeId)}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-dark-900 mb-4">
              Why Choose Our Subscription Plans?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All plans include our core features designed to help you grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-lg text-dark-900 mb-2">Instant Setup</h3>
              <p className="text-gray-600">Get started immediately with our easy setup process</p>
            </div>

            <div className="text-center">
              <div className="bg-accent-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="font-semibold text-lg text-dark-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600">All payments processed securely through Stripe</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-lg text-dark-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it with our support team</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-dark-900 mb-4">
            Subscription FAQ
          </h2>
          <p className="text-gray-600">
            Common questions about our subscription plans
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-dark-900 mb-2">
              Can I switch between subscription plans?
            </h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your subscription at any time. Changes will be prorated and reflected in your next billing cycle.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-dark-900 mb-2">
              How does the Stripe integration work?
            </h3>
            <p className="text-gray-600">
              All subscriptions are processed through Stripe, ensuring secure and reliable payment processing. You&apos;ll receive automatic invoices and can manage your subscription through your dashboard.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-dark-900 mb-2">
              Is there a free trial available?
            </h3>
            <p className="text-gray-600">
              We offer a 7-day free trial for all Premium plans. No credit card required to start your trial.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-dark-900 mb-2">
              What happens if I cancel my subscription?
            </h3>
            <p className="text-gray-600">
              You can cancel your subscription at any time. You&apos;ll continue to have access to your plan features until the end of your current billing period.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl text-dark-900 mb-4">
            Ready to Start Your Subscription?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of professionals growing their business with A-List Home Pros subscription plans
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Crown className="h-5 w-5 mr-2" />
              Start Your Subscription
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 