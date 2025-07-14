'use client';

import Link from 'next/link';
import { Star, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: "Kitchen Remodeling",
      description: "Transform your kitchen with expert designers and contractors",
      icon: "🏠",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$85/hr",
      professionals: "1,200+",
      features: ["Custom Design", "Quality Materials", "Professional Installation", "Warranty Included"]
    },
    {
      title: "Bathroom Renovation",
      description: "Modern bathroom designs and professional installation",
      icon: "🚿",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$92/hr",
      professionals: "850+",
      features: ["Plumbing Updates", "Tile Installation", "Fixture Replacement", "Waterproofing"]
    },
    {
      title: "Electrical Work",
      description: "Licensed electricians for all your electrical needs",
      icon: "⚡",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$78/hr",
      professionals: "650+",
      features: ["Panel Upgrades", "Outlet Installation", "Lighting", "Safety Inspections"]
    },
    {
      title: "Plumbing Services",
      description: "Professional plumbers for repairs and installations",
      icon: "🔧",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$82/hr",
      professionals: "780+",
      features: ["Emergency Repairs", "Pipe Installation", "Drain Cleaning", "Water Heaters"]
    },
    {
      title: "Roofing Services",
      description: "Expert roof repair and installation services",
      icon: "🏘️",
      image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$95/hr",
      professionals: "450+",
      features: ["Roof Repair", "New Installation", "Gutter Work", "Inspections"]
    },
    {
      title: "Landscaping",
      description: "Beautiful outdoor spaces and garden design",
      icon: "🌳",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      avgPrice: "$68/hr",
      professionals: "920+",
      features: ["Garden Design", "Lawn Care", "Irrigation", "Hardscaping"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-dark-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From small repairs to major renovations, find trusted professionals for every home improvement need. 
              All our contractors are verified, licensed, and insured.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 text-4xl">{service.icon}</div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                  {service.avgPrice}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium">4.9</span>
                    <span className="mx-1">•</span>
                    <span>{service.professionals} professionals</span>
                  </div>
                </div>
                
                <Link
                  href={`/professionals?category=${encodeURIComponent(service.title)}`}
                  className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Find Professionals</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-dark-900 mb-6">
              Need a Custom Service?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Don&apos;t see exactly what you&apos;re looking for? Post your project and get proposals from professionals 
              who specialize in your specific needs.
            </p>
            <Link
              href="/post-project"
              className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Post Your Project</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 