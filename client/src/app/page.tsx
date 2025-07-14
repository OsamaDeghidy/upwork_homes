import Hero from "@/components/sections/Hero";
import { Search, CheckCircle, Star, Shield, ArrowRight, Sparkles, Target, Calendar, MessageSquare, BookOpen, UserPlus, Crown, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Popular Services Data
  const popularServices = [
    {
      title: "Kitchen Remodeling",
      description: "Transform your kitchen with expert designers",
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$85/hr",
      professionals: "1,200+"
    },
    {
      title: "Bathroom Renovation",
      description: "Modern bathroom designs and installation",
      icon: "🚿",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$92/hr",
      professionals: "850+"
    },
    {
      title: "Electrical Work",
      description: "Licensed electricians for all your needs",
      icon: "⚡",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$78/hr",
      professionals: "650+"
    },
    {
      title: "Plumbing Services",
      description: "Professional plumbers for repairs",
      icon: "🔧",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$82/hr",
      professionals: "780+"
    },
    {
      title: "Roofing Services",
      description: "Expert roof repair and installation",
      icon: "🏘️",
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$95/hr",
      professionals: "450+"
    },
    {
      title: "Landscaping",
      description: "Beautiful outdoor spaces and gardens",
      icon: "🌳",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$68/hr",
      professionals: "920+"
    }
  ];

  // How It Works Steps
  const howItWorksSteps = [
    {
      step: "01",
      title: "Search & Discover",
      description: "Enter your location and service needs to find verified professionals in your area.",
      icon: Search,
      color: "primary"
    },
    {
      step: "02",
      title: "Book & Connect",
      description: "Review profiles, read reviews, and connect with the perfect professional for your project.",
      icon: Calendar,
      color: "accent"
    },
    {
      step: "03",
      title: "Pay Securely",
      description: "Make secure payments through our platform with built-in protection and escrow services.",
      icon: Shield,
      color: "success"
    },
    {
      step: "04",
      title: "Review & Rate",
      description: "Share your experience and help other homeowners by rating and reviewing your professional.",
      icon: Star,
      color: "primary"
    }
  ];

  // Featured Professionals
  const featuredProfessionals = [
    {
      name: "Sarah Mitchell",
      specialty: "Kitchen Designer",
      rating: 4.9,
      reviews: 127,
      hourlyRate: "$85",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      verified: true,
      topRated: true,
      completedProjects: 45,
      responseTime: "2 hours",
      location: "Los Angeles, CA"
    },
    {
      name: "David Rodriguez",
      specialty: "Master Electrician",
      rating: 5.0,
      reviews: 89,
      hourlyRate: "$95",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      verified: true,
      topRated: true,
      completedProjects: 67,
      responseTime: "1 hour",
      location: "Miami, FL"
    },
    {
      name: "Maria Santos",
      specialty: "Interior Designer",
      rating: 4.8,
      reviews: 156,
      hourlyRate: "$75",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      verified: true,
      topRated: false,
      completedProjects: 78,
      responseTime: "3 hours",
      location: "Chicago, IL"
    },
    {
      name: "James Wilson",
      specialty: "Plumbing Expert",
      rating: 4.9,
      reviews: 203,
      hourlyRate: "$88",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      verified: true,
      topRated: true,
      completedProjects: 112,
      responseTime: "1 hour",
      location: "Phoenix, AZ"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Jennifer Walsh",
      location: "San Francisco, CA",
      rating: 5,
      comment: "Finding the right contractor for our kitchen remodel seemed impossible until we discovered A-List Home Pros. Within 48 hours, we had three qualified contractors bidding on our project.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      projectType: "Kitchen Remodel"
    },
    {
      name: "Michael Chen",
      location: "Austin, TX",
      rating: 5,
      comment: "The electrician we hired through A-List was professional, punctual, and did excellent work. The entire process was smooth and stress-free.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      projectType: "Electrical Work"
    },
    {
      name: "Lisa Anderson",
      location: "Denver, CO",
      rating: 5,
      comment: "Our bathroom renovation turned out better than we imagined. The platform made it easy to find a trustworthy contractor who delivered on time and within budget.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      projectType: "Bathroom Renovation"
    }
  ];

  // Blog Posts
  const blogPosts = [
    {
      title: "10 Essential Questions to Ask Before Hiring a Contractor",
      excerpt: "Learn what questions to ask to ensure you hire the right professional for your home improvement project.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Tips & Guides",
      readTime: "5 min read",
      date: "Dec 15, 2024",
      slug: "questions-to-ask-contractor"
    },
    {
      title: "2024 Home Renovation Trends You Should Know",
      excerpt: "Discover the latest trends in home improvement and renovation for the coming year.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Trends",
      readTime: "7 min read",
      date: "Dec 12, 2024",
      slug: "home-renovation-trends-2024"
    },
    {
      title: "How to Budget for Your Next Home Improvement Project",
      excerpt: "A comprehensive guide to planning and budgeting for your upcoming renovation or repair project.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Planning",
      readTime: "6 min read",
      date: "Dec 10, 2024",
      slug: "budget-home-improvement-project"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {/* Popular Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Most Popular Services
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              Browse Our 
              <span className="text-gradient-primary"> Top Services</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              From kitchen renovations to electrical work, find verified professionals for every home improvement need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service, index) => (
              <Link key={index} href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="group bg-white rounded-2xl shadow-upwork hover:shadow-upwork-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-dark-800 shadow-sm">
                      {service.professionals} pros
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {service.avgPrice}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{service.icon}</span>
                      <h3 className="font-heading font-semibold text-xl text-dark-900 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-dark-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-flex items-center bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Target className="h-4 w-4 mr-2" />
              How It Works
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              Get Started in 
              <span className="text-gradient-accent"> 4 Simple Steps</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Our streamlined process makes it easy to find, hire, and work with trusted professionals for your home projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-dark-900 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-dark-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/how-it-works"
              className="inline-flex items-center bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Crown className="h-4 w-4 mr-2" />
              Featured Professionals
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              Meet Our 
              <span className="text-gradient-primary"> Top-Rated Experts</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Work with verified professionals who consistently deliver exceptional results and exceed customer expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProfessionals.map((pro, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-upwork hover:shadow-upwork-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300">
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <Image
                        src={pro.image}
                        alt={pro.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover mx-auto shadow-lg"
                      />
                      {pro.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-primary-500 rounded-full p-2 shadow-lg">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-dark-900 mt-4 mb-1">{pro.name}</h3>
                    <p className="text-dark-600 text-sm mb-2">{pro.specialty}</p>
                    <p className="text-dark-500 text-xs">{pro.location}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-semibold text-dark-900">{pro.rating}</span>
                        <span className="ml-1 text-sm text-dark-500">({pro.reviews})</span>
                      </div>
                      <span className="text-sm font-semibold text-dark-900">{pro.hourlyRate}/hr</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="font-semibold text-dark-900">{pro.completedProjects}</div>
                        <div className="text-dark-600 text-xs">Projects</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <div className="font-semibold text-dark-900">{pro.responseTime}</div>
                        <div className="text-dark-600 text-xs">Response</div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary-500 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 shadow-sm hover:shadow-md">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/find-pros"
              className="inline-flex items-center bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Professionals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-success-100 text-success-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MessageSquare className="h-4 w-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              What Our 
              <span className="text-gradient-primary"> Customers Say</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Read real reviews from homeowners who found their perfect professionals through A-List Home Pros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-upwork hover:shadow-upwork-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-dark-700 leading-relaxed mb-6">
                  &quot;{testimonial.comment}&quot;
                </blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <div className="font-semibold text-dark-900">{testimonial.name}</div>
                    <div className="text-dark-600 text-sm">{testimonial.location}</div>
                    <div className="text-primary-600 text-sm font-medium">{testimonial.projectType}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <BookOpen className="h-4 w-4 mr-2" />
              Latest Articles
            </div>
            <h2 className="font-heading font-bold text-4xl lg:text-5xl text-dark-900 mb-6">
              Home Improvement 
              <span className="text-gradient-accent"> Tips & Guides</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Stay informed with expert advice, industry insights, and helpful tips for your home improvement projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-2xl shadow-upwork hover:shadow-upwork-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-semibold text-xl text-dark-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-dark-600 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-dark-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="inline-flex items-center bg-accent-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Read More Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join as Pro / Pricing CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <UserPlus className="h-4 w-4 mr-2" />
              Join Our Network
            </div>
            
            <h2 className="font-heading font-bold text-4xl lg:text-6xl text-white mb-6 leading-tight">
              Ready to Grow Your
              <span className="block text-yellow-200">Business?</span>
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who are growing their businesses with A-List Home Pros. 
              Get access to qualified leads, secure payments, and powerful tools to manage your work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">$2.8M+</div>
              <div className="text-blue-100">Earned by professionals</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Active professionals</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Customer satisfaction</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/pricing"
              className="group relative inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              <Briefcase className="mr-3 h-6 w-6" />
              View Pricing Plans
            </Link>
            <Link
              href="/register"
              className="group inline-flex items-center justify-center border-2 border-white/50 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <UserPlus className="mr-3 h-6 w-6" />
              Join as Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
